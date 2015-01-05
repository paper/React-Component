
var TabNav = React.createClass({

  handleClick : function(ev){
    if( this.props.options.mouseover === true ) return;
    
    var clickNode = ev.target;
    var id = +clickNode.getAttribute('data-id');
    
    this.props.onUserActive(id);
  },
  
  handleMouseover : function(ev){
    var self = this;
    
    if( self.props.options.mouseover !== true ) return;
    
    var clickNode = ev.target;
    var id = +clickNode.getAttribute('data-id');
    
    clearTimeout(self.props.options.delayTime);
    self.props.options.delayTime = setTimeout(function(){

      self.props.onUserActive(id);
      
    }, self.props.options.delay);
  },
  
  render : function(){
    var self = this;
    
    var navs = self.props.navs;
    var options = self.props.options;
    
    var links = [];
    var curClassName = 'cur';
    
    navs.forEach(function(nav, i){
    
      var curClass = options.curNavIndex === i ? curClassName : '';
      
      links.push(
        <li key={i} className={curClass}>
          <a href="javascript:;" data-id={i} onMouseOver={self.handleMouseover} onClick={self.handleClick}>
            {nav}
          </a>
        </li>
      );
      
    });
    
    return (
      <div className="mod-tab-nav">
        <ul className="clearfix">
          {links}
        </ul>
      </div>
    )
  }
});


var TabContent = React.createClass({
  render : function(){
    
    var self = this;
    var contentsHtml = [];

    self.props.contents.forEach(function(content, i){
      var contentClassName = 'mod-tab-content hidden';
      
      if( i === self.props.options.curNavIndex){
        contentClassName = 'mod-tab-content';
      }
      
      contentsHtml.push(
        <div className={contentClassName}>
          {content}
        </div>
      )
    });
    
    return (
      <div className="mod-tab-content-wrap">
        {contentsHtml}
      </div>
    )
  }
});

var Tab = React.createClass({

  getInitialState: function() {
    function extend(options, ex){
      ex = ex || {};
      
      for(var i in ex){
        if(ex.hasOwnProperty(i)){
          options[i] = ex[i];
        }
      }
      
      return options;
    }
    
    var defaultOptions = {
      mouseover : false,
      delay : 10,
      delayTime : null,
      curNavIndex : 0
    }
    
    return extend(defaultOptions, this.props.options);
  },
  
  handleUserActive: function(curNavIndex) {
    this.setState({curNavIndex : curNavIndex});
  },
  
  render : function(){
    
    return (
      <div className="mod-tab">
        <TabNav
          navs = {this.props.navs}
          options = {this.state}
          onUserActive = {this.handleUserActive}
        />
        <TabContent
          contents = {this.props.contents}
          options = {this.state}
        />
      </div>
    )
  }
});

