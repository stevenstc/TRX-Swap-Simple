(this.webpackJsonplioncoin=this.webpackJsonplioncoin||[]).push([[0],{101:function(e,t){},120:function(e,t){},220:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n.n(a),o=n(69),s=n.n(o),l=n(2),c=n.n(l),i=n(15),d=n(70),m=n.n(d),u={tronWeb:!1,contract:!1,setTronWeb(e){this.tronWeb=e},setContract(e,t){var n=this;return Object(i.a)(c.a.mark((function a(){return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.contract().at(t);case 2:n.contract=a.sent;case 3:case"end":return a.stop()}}),a)})))()}},p="TExwHCjZYbb7ToQUfQY5JgumwbcXAgeaVd",w="TLEvAFNVxM4LdQShrmrUxz4x8N6MM6sa46";class b extends a.Component{constructor(e){super(e),this.state={min:10},this.compra=this.compra.bind(this),this.estado=this.estado.bind(this)}componentDidMount(){var e=this;return Object(i.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.setContract(window.tronWeb,w);case 2:e.estado(),setInterval((()=>e.estado()),3e3);case 4:case"end":return t.stop()}}),t)})))()}estado(){var e=this;return Object(i.a)(c.a.mark((function t(){var n,a,r,o,s,l,i,d,m;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:return n=t.sent,n=window.tronWeb.address.fromHex(n.address),a=n.substr(0,4),r=n.substr(-4),o=a+"..."+r,document.getElementById("login").innerHTML='<a href="https://tronscan.io/#/address/'+n+'" class="nav-link js-scroll-trigger">'+o+"</a>",s=10,t.next=11,window.tronWeb;case 11:return l=t.sent,t.next=14,l.contract().at(p);case 14:return i=t.sent,t.next=17,i.allowance(n,w).call();case 17:return d=t.sent,d=parseInt(d.remaining._hex),d="Comprar",t.next=22,u.contract.RATE().call();case 22:m=t.sent,e.setState({min:s,deposito:d,rate:m/1e6});case 24:case"end":return t.stop()}}),t)})))()}compra(){var e=this;return Object(i.a)(c.a.mark((function t(){var n,a,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state.min,a=document.getElementById("amount").value,a=parseFloat(a),a=parseInt(1e6*a),t.next=6,window.tronWeb.trx.getBalance();case 6:if(r=t.sent,console.log(r),console.log(a),!(r>=a)){t.next=21;break}if(!(a>=1e6*n)){t.next=17;break}return document.getElementById("amount").value="",t.next=14,u.contract.compra().send({callValue:a});case 14:window.alert("Felicidades compraste: "+parseInt(a/e.state.rate*100)/1e8+" LCN"),t.next=19;break;case 17:window.alert("Please enter an amount greater than 10 TRX"),document.getElementById("amount").value=10;case 19:t.next=22;break;case 21:a>10&&r>10?a>r?r<=0?(document.getElementById("amount").value=10,window.alert("You do not have enough funds in your account you place at least 10 TRX")):(document.getElementById("amount").value=10,window.alert("You must leave TRX free in your account to make the transaction")):(document.getElementById("amount").value=a,window.alert("You must leave TRX free in your account to make the transaction")):window.alert("You do not have enough funds in your account you place at least 10 TRX");case 22:case"end":return t.stop()}}),t)})))()}render(){var e=this.state.min;return e="Min. "+e+" TRX",r.a.createElement("div",null,r.a.createElement("div",{className:"form-group text-center"},r.a.createElement("p",{className:"card-text"},"1 LCN = ",this.state.rate," TRX"),r.a.createElement("input",{type:"number",className:"form-control mb-20 text-center",id:"amount",placeholder:e}),r.a.createElement("p",{className:"card-text"},"Debes tener TRX para hacer la transacci\xf3n"),r.a.createElement("a",{href:"#root",className:"btn btn-outline-light py-3 px-4 rounded-pill js-scroll-trigger",onClick:()=>this.compra()},this.state.deposito)))}}var g=n(74),h=n.n(g),f="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/",v=r.a.createElement("div",{className:"col-sm-4 text-center"},r.a.createElement("img",{src:h.a,className:"img-fluid",alt:"TronLink logo"})),E=()=>{window.open(f,"_blank")},x=e=>{var t=e.installed;return void 0!==t&&t?r.a.createElement(r.a.Fragment,null,"  ",r.a.createElement("a",{href:"/"},r.a.createElement("div",{className:"tronLink row",style:{padding:"3em",decoration:"none",color:"black"}},r.a.createElement("div",{className:"info col-sm-8"},r.a.createElement("h1",null,"Log in Required"),r.a.createElement("p",null,"TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your first wallet or decrypt a previously created wallet.")),v))):r.a.createElement("div",{className:"row",onClick:E},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h1",null,"TronLink Required"),r.a.createElement("p",null,"To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser that can be ",r.a.createElement("a",{href:f,target:"_blank",rel:"noopener noreferrer"},"installed from the Chrome Webstore"),". Once installed, return back and refresh the page.")),v)},W="TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";class k extends a.Component{constructor(e){super(e),this.state={tronWeb:{installed:!1,loggedIn:!1}}}componentDidMount(){var e=this;return Object(i.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((t=>{var n={installed:!!window.tronWeb,loggedIn:window.tronWeb&&window.tronWeb.ready};if(n.installed)return e.setState({tronWeb:n}),t();var a=0,r=setInterval((()=>{if(a>=10){var o="https://api.trongrid.io";return window.tronWeb=new m.a(o,o,o),e.setState({tronWeb:{installed:!1,loggedIn:!1}}),clearInterval(r),t()}if(n.installed=!!window.tronWeb,n.loggedIn=window.tronWeb&&window.tronWeb.ready,!n.installed)return a++;e.setState({tronWeb:n}),t()}),100)}));case 2:e.state.tronWeb.loggedIn||(window.tronWeb.defaultAddress={hex:window.tronWeb.address.toHex(W),base58:W},window.tronWeb.on("addressChange",(()=>{e.state.tronWeb.loggedIn||e.setState({tronWeb:{installed:!0,loggedIn:!0}})}))),u.setTronWeb(window.tronWeb);case 4:case"end":return t.stop()}}),t)})))()}render(){return this.state.tronWeb.installed?this.state.tronWeb.loggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"download bg-primary text-center",id:"download"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-8 mx-auto"},r.a.createElement("h2",{className:"section-heading"},"Compra LION COIN!"),r.a.createElement("p",null,"No te pierdas la gran oportunidad de ser pionero al invertir!"),r.a.createElement(b,null)))))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(x,{installed:!0}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(x,null)))}}var N=k,y=document.getElementById("root");s.a.render(r.a.createElement(N,null),y)},74:function(e,t,n){e.exports=n.p+"static/media/TronLinkLogo.d3a8f115.png"},77:function(e,t,n){e.exports=n(220)}},[[77,1,2]]]);
//# sourceMappingURL=main.a1f800d4.chunk.js.map