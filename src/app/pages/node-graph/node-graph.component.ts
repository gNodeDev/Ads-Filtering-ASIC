import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { ConstantService } from 'src/app/service/constant.service';
import { ApiService } from 'src/app/service/api/api.service';
declare var d3:any;
declare var go:any;

@Component({
  selector: 'app-node-graph',
  templateUrl: './node-graph.component.html',
  styleUrls: ['./node-graph.component.scss']
})
export class NodeGraphComponent implements OnInit {


  constructor(   
    private constantSvc: ConstantService,
    private apiSvc: ApiService
  ) { }

  ngOnInit() {
    this.nodegraph();

  }

  nodegraph(){
    let body = {
      nodeId : "238256"
    }

       var crRep = [];
      var Compony = [];
      var AfsRep = [];
    this.apiSvc.postService(this.constantSvc.APIConfig.GET_NODE_POST_DATA, body).subscribe((response) => {
      console.log(response);
   
      if(response.code == 200 && response.status == true){
        if(response.data && response.data.CrRep){

          response.data.CrRep.forEach(cr => {
            let createData = {
                "name": cr.cred_rep_no +"," + cr.cred_rep_name,
                "parent": "Top Level",
                "status": "#b578ac",
                "children": null
            }
            crRep.push(createData)
          });
        }

         if(response.data && response.data.Afs_lic_represenatative){
          response.data.Afs_lic_represenatative.forEach(Afsre => {
            let afscreateData = {
                "name": Afsre.afs_rep_no +", " + Afsre.afs_rep_name,
                "parent": "Top Level",
                "status": "#e2b75e",
                "children": null
            }
            AfsRep.push(afscreateData)
          });
        }

        if(response.data && response.data.compony){
            let abn = response.data.compony.acn == ''?response.data.compony.acn:response.data.compony.abn;
            let ComponyData = {
              "name": response.data.compony.compony_name + ' (' + abn + ') ',
              "parent": "Top Level",
              "status": "#add8e6",
              "children": null
            }
            Compony.push(ComponyData)
        }

      }else{
        // this.audioTransitData = [];
      }

  

    var treeData = [{
      "name": "Ad ID 10",
      "parent": "a",
      "status": "red",
      "children": [
        {
            "name": response.data.AclNumber,
            "parent": "Top Level",
            "status": "green",
             "children": [
                 {
                    "name": "Company Detail",
                    "parent": "Top Level",
                    "status": "#53bfe2",
                    "children": Compony
                },
                {
                    "name": "AFS Licence",
                    "parent": "Top Level",
                    "status": "#cd941d",
                     "children": [
                        {
                          "name":  "AFS lic" + response.data.afc_lic_no?response.data.afc_lic_no:'',
                          "parent": "Top Level",
                          "status": "#a55099",
                          "children":AfsRep
                        }
                    ]
                },
                {
                    "name": "Credit Rep Detail",
                    "parent": "Top Level",
                    "status": "#a55099",
                    "children": crRep
                },  
               
              ]
        },
      ]
    }
  ];

  var margin = {top: 100, right: 120, bottom: 100, left: 120},
	width = 1300 - margin.right - margin.left,
	height = 1300 - margin.top - margin.bottom;
	var i = 0, duration = 750, root;
  
  var tree = d3.layout.tree().size([height, width]);
  
  var diagonal = d3.svg.diagonal().projection(function(d) {
    return [d.y, d.x]; 
  });

  var svg = d3.select(".chetan").append("svg")
              .attr("width", '100%')
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;

  function toggleAll(d) {
    if (d.children) {
      if (d.status == "green") {
          d._children = d.children;
          d._children.forEach(toggleAll);
          d.children = null;
      }else
        d.children.forEach(toggleAll);
    }
  }

  root.children.forEach(toggleAll);
  update(root);
  d3.select(self.frameElement).style("height", "1000px");
  
  
  function update(source) {
    var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);
    nodes.forEach(function(d) { d.y = d.depth * 180; });
    var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });
    var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) { 
       return "translate(" + source.y0 + "," + source.x0 + ")"; 
    }).on("click", click);
    
    nodeEnter.append("circle").attr("r", 1e-6).style("fill", function(d) {
       return d.status; 
    });

    nodeEnter.append("text").attr("x", function(d) { 
      return d.children || d._children ? -13 : 13; 
    }).attr("dy", ".35em").attr("text-anchor", function(d) { 
      return d.children || d._children ? "end" : "start"; 
    }).text(function(d) { 
      return d.name; 
    }).style("fill-opacity", 1e-6);
      var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) { 
      return "translate(" + d.y + "," + d.x + ")"; 
    });
    nodeUpdate.select("circle").attr("r", 10).style("fill", function(d) { 
      return d.status; 
    });






        
     








    nodeUpdate.select("text").style("fill-opacity", 1);
    
    var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) { 
      return "translate(" + source.y + "," + source.x + ")"; 
    }).remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    var link = svg.selectAll("path.link").data(links, function(d) { return d.target.id; });
    link.enter().insert("path", "g").attr("class", "link").attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    });

    link.transition().duration(duration).attr("d", diagonal);

    link.exit().transition().duration(duration).attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    }).remove();

    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0, //<-- 0!
        lineHeight = 1.2, // ems
        x = text.attr("x"), //<-- include the x!
        y = text.attr("y"),
        dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
        var tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
});
}


}
