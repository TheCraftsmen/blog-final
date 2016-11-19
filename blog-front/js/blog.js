/*
Aca entra la magia react
at the game begin
*/

var Blog = (function(){

  class SubPanel extends React.Component {
      render(){
        return(
          React.createElement('div',
          {className: this.props.clase},
          this.props.variable)
        );
      }
  }

  class Panel extends React.Component {
    render(){
      return React.createElement(
              "div",
              {className: 'panel panel-default'},
              React.createElement(SubPanel, { variable: this.props.task.name,
              clase: 'panel-heading'}),
              React.createElement(SubPanel, { variable: this.props.task.body,
              clase: 'panel-body'}),
              React.createElement(SubPanel, { variable: this.props.task.email,
              clase: 'panel-footer'})
      );
    }
  }

  function renderPanels(data){
    var allPanels = [];
    $.each(data, function(i, task){
      allPanels.push(React.createElement(Panel,{task: task, key: task.id}));
    });
    ReactDOM.render(React.createElement('div',null,allPanels),$('#menu')[0]);
  }

  function getAllPost(){
    $.ajax({
      url:'https://jsonplaceholder.typicode.com/comments',
      type:'GET',
      success: function(data){
        renderPanels(data);
      },
      error:function(data){
        console.log(data);
      }
    });
  }

  function addPost(){
    $('#form').submit(function(){
      $.ajax({
        url:'https://jsonplaceholder.typicode.com/comments',
        type:'POST',
        data: $(this).serialize()
      });
      return false;
    });
  }

  var object = {
      submitPost: addPost,
      getAllPost: getAllPost
  }

  return object;
})();