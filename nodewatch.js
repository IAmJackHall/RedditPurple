"use strict";(function(e){var t=e.document.documentElement;var n=t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;var r=function(e,t){this.selector=e;this.callback=t;this.queuedForDelete=false};r.prototype.matches=function(e){return n.call(e,this.selector)};r.prototype.exec=function(e){this.callback.call(null,e,this)};r.prototype.test=function(e){if(this.matches(e)){this.exec(e)}};var i=function(){this.watchedSelectors=[];this.deleteQueueCount=0};i.prototype.handleSelectorMutation=function(e){if(e.animationName==="load"){this.handlingMutations=true;for(var t=0,n=this.watchedSelectors.length;t<n;t++){var r=this.watchedSelectors[t];if(!r.queuedForDelete){r.test(e.target)}}this.handlingMutations=false;this.flushDeleteQueue()}};i.prototype.initialize=function(){if(!this.initialized){var t=e.document.createElement("style");t.setAttribute("id","NodeWatchAnimationShim");t.appendChild(e.document.createTextNode("@-webkit-keyframes load { 100% { visibility: visible; } } @keyframes load { 100% { visibility: visible; }}"));e.document.head.appendChild(t);this.watchAnimations();this.initialized=true}};i.prototype.watchAnimations=function(){var t=this;var n=function(e){t.handleSelectorMutation.call(t,e)};e.document.addEventListener("animationstart",n,true);e.document.addEventListener("webkitAnimationStart",n,true)};i.prototype.watchSelector=function(t,n){this.initialize();var i=new r(t,n);this.watchedSelectors.push(i);var s=e.document.createElement("style");s.appendChild(document.createTextNode(t+" { -webkit-animation: load 1s; animation: load 1s; }"));e.document.head.appendChild(s);return i};i.prototype.unwatch=function(e){e.queuedForDelete=true;this.deleteQueueCount++;if(!this.handlingMutations){this.flushDeleteQueue()}};i.prototype.flushDeleteQueue=function(){if(this.handlingMutations){throw"Unable to flush delete queue while processing mutations"}if(this.deleteQueueCount>0){var e=this.watchedSelectors.length;while(e--){if(this.watchedSelectors[e].queuedForDelete===true){this.watchedSelectors.splice(e,1)}}this.deleteQueueCount=0}};e.NodeWatch=new i;return e.NodeWatch})(this)
