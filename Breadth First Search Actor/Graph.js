  function Graph(){
    this.nodes = [];
    this.start = null;
    this.end = null;
    this.graph = {};
  }

  Graph.prototype.addNode = function(n){
    this.nodes.push(n);
     var title = n.value;
    // Node into "hash"
    this.graph[title] = n;
  }

  Graph.prototype.setStart = function(n){
    this.start = this.graph[n];
    return this.start;
  }

  Graph.prototype.setEnd = function(n){
    this.end = this.graph[n];
    return this.end;
  }

  Graph.prototype.reset = function(){
    for(var i=0;i<this.nodes.length;i++){
      this.nodes[i].searched = false;
      this.nodes[i].parent = null;
    }
  }

  Graph.prototype.getNode = function(n){
    return this.graph[n];
  }
