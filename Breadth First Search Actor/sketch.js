
// Example output = Stanley Tucci --> Spotlight --> Billy Crudup --> Eat Pray Love --> Julia Roberts --> Flatliners --> Kevin Bacon
var dropdown;
var graph;

function preload(){
  //data = loadJSON('kevinbacon.json');

}

function setup(){
  graph = new Graph();
  noCanvas;
  
  dropdown = createSelect();
  dropdown.changed(bfs);
  //console.log(data);
  var movies = data.movies;
  //console.log(movies);
  for(var i=0;i<movies.length;i++){
    
    var movie = movies[i].title;
    var cast = movies[i].cast
    var movieNode = new node(movie);

    graph.addNode(movieNode);

    for(var j=0;j<cast.length;j++){
      var actor = cast[j];
      var actorNode = graph.getNode(actor);
      if(actorNode == undefined){  //IF actor not created yet
        actorNode = new node(actor);
        dropdown.option(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);  //Link all actors to their respective movies

    }
  }

  
  console.log(graph);
}


function bfs(){
  graph.reset(); //Everytime new actor is choosen reset the graph
  var start = graph.setStart(dropdown.value());
  var end = graph.setEnd("Kevin Bacon") // lets search for all actors linked with kevin

  start.searched = true; //as we started with start node
  var queue = [];   //queue for holding the neighbours

  queue.push(start);

  while(queue.length>0){
    var current = queue.shift();  //pop the top element of queue
    if(current==end){
      console.log("Found :"+ current.value); 
      break;
    }

    var edges = current.edges
    for(var i=0;i<edges.length;i++){   //looping through all the neighbours of node
      var neighbour = edges[i];
      if(!neighbour.searched){
        neighbour.searched = true;
        neighbour.parent = current;   //set the current node parent of the neighbour node
        //console.log(neighbour.parent);
        queue.push(neighbour);    //push to the queue
      }
    }
  }

  // now for displaying the path
  var path = [];
  path.push(end);  // displaying from end node to start node
  var next = end.parent;
  while(next!=null){
    path.push(next);
    //console.log(parent);
    next = next.parent;
  }

  var txt = '';
  for (var i = path.length - 1; i >= 0; i--) {
    var n = path[i];
    txt += n.value
    if (i != 0) {
      txt += ' --> '
    };
  }
  console.log(path);
  createP(txt);
}