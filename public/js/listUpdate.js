var list=[];
var maxSongs = 5; //to read from the server initially

$("#addSong").click(function(){
  var selectedSong = $('#selected-song').val();
  var id = "#"+selectedSong.substring(14);
  var name = $(id).attr('idName');
  if (list.length < maxSongs - 1){
    list.push({spotifyID:selectedSong,name:name});
    console.log(list);
    text = name+'<button id="'+selectedSong+'">x</button>';
    $('<li />',{html: text}).appendTo('ul.songList');
  }else{
    console.log(maxSongs+' selected already!');
  }  
});

$('ul').on('click','button',function(el){
  song = this.id;
  console.log(song);
  deleteFromTheList(list,song);
  $(this).parent().remove();
});

deleteFromTheList = function(list,song){
  var index = -1;
  for(var i=0; i < list.length; i++){
    if (list[i].spotifyID == song){
      index = i;
    }
  }
  if (index > -1){
    list.splice(index,1);
  }
}