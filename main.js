const print = (function(x){
 [...document.getElementsByClassName('output')][0].contentWindow.document.innerHTML = 
 '<p>' + x + '<br /></p>';
});

window.onload = function() {
 let files = {'test':{'html':'','css':'','js':''}};
 let currentFile = 'test';
 
	const positions = {
		'l-a':[[0,10],[0,40],[0,70]],
		'l-b':[[0,10],[50,10],[0,55]],
		'l-c':[[0,10],[0,55],[50,55]],
		'l-d':[[0,10],[50,10],[50,55]],
		'l-e':[[0,10],[33.33,10],[66.66,10]]
	};

	const sizes = {
		'l-a':[[100,30],[100,30],[100,30]],
		'l-b':[[50,45],[50,45],[100,45]],
		'l-c':[[100,45],[50,45],[50,45]],
		'l-d':[[50,90],[50,45],[50,45]],
		'l-e':[[33.33,90],[33.33,90],[33.33,90]]
	};

	['a','b','c','d','e'].forEach(v => {
		document.getElementById('l-' + v).onclick = () => {
			[...document.getElementsByClassName('chosen')][0].classList.remove('chosen');
			document.getElementById('l-' + v).classList.add('chosen');
			[0,1,2].forEach(w => {
				const el = [...document.getElementsByClassName('code')][w]
				console.log(el);
				el.style.left = positions['l-' + v][w][0] + 'vw';
				el.style.top = positions['l-' + v][w][1] + 'vh';
				el.style.width = sizes['l-' + v][w][0] + '%';
				el.style.height = sizes['l-' + v][w][1] + '%';
			});
		}
	});

 function dictSort(d){
  let keys = [];
  for(let k in d){keys.push(k);}
  keys.sort();
  let d2 = {};
  for(let k of keys){d2[k] = d[k];}
  return d2;
 }
 
 function save(e){
  if(e.keyCode === 13){
   e.preventDefault();
   if(document.getElementById('flname') !== undefined){
    if(files[document.getElementById('flname').value] === undefined){
     files[document.getElementById('flname').value] = '';
     updateFiles();
    }
    files[currentFile]['html'] = [...document.getElementsByClassName('code-html')][0].value;
    files[currentFile]['css'] = [...document.getElementsByClassName('code-css')][0].value;
    files[currentFile]['js'] = [...document.getElementsByClassName('code-js')][0].value;
	  if(files[document.getElementById('flname').value] === undefined){
			files[document.getElementById('flname').value] = {'html':'','css':'','js':''};
		}
    [...document.getElementsByClassName('code-html')][0].value =
            files[document.getElementById('flname').value]['html'];
    [...document.getElementsByClassName('code-css')][0].value =
            files[document.getElementById('flname').value]['css'];
    [...document.getElementsByClassName('code-js')][0].value =
            files[document.getElementById('flname').value]['js'];
    currentFile = document.getElementById('flname').value
   }
  }
 };
 
 function updateFiles(){
  [...document.getElementsByClassName('files')][0].innerHTML = '';
  for(var file in dictSort(files)){
   [...document.getElementsByClassName('files')][0].innerHTML += '<p>&nbsp;> ' + file + '<br /></p>'
  }
  document.getElementById('filename').innerHTML =
                       '<p>filename: </p><textarea id="flname">'
                       + currentFile
                       + '</textarea>';
  document.getElementById('flname').onkeydown = save;
 }
 updateFiles();
 
 [...document.getElementsByClassName('code-html')].forEach(function(el){
  el.onkeydown = function(e) {
   if(e.keyCode === 9){
    const start = e.target.selectionStart, end = e.target.selectionEnd;
    e.target.value = e.target.value.substr(0,start) + ' ' + e.target.value.substr(end);
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    e.preventDefault();
   }
  };
 });
 
 [...document.getElementsByClassName('code-js')].forEach(function(el){
  el.onkeydown = function(e) {
   if(e.keyCode === 9){
    const start = e.target.selectionStart, end = e.target.selectionEnd;
    e.target.value = e.target.value.substr(0,start) + ' ' + e.target.value.substr(end);
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    e.preventDefault();
   }
  };
 });
 
 [...document.getElementsByClassName('title')].forEach(function(el){
  el.onclick = function(){
   document.getElementsByClassName('active')[0].classList.remove('active');
   el.classList.add('active');
   let idx = Math.floor([...document.getElementsByClassName('title')].indexOf(el)/3);
   if(el.classList.contains('t-code')){
    [...document.getElementsByClassName('code-html')][0].style.zIndex = 3;
    [...document.getElementsByClassName('code-css')][0].style.zIndex = 3;
    [...document.getElementsByClassName('code-js')][0].style.zIndex = 3;
    [...document.getElementsByClassName('output')][0].style.zIndex = 2;
    [...document.getElementsByClassName('files')][0].style.zIndex = 1;
   }else if(el.classList.contains('t-output')){
    [...document.getElementsByClassName('files')][0].style.zIndex = 1;
    [...document.getElementsByClassName('code-html')][0].style.zIndex = 2;
    [...document.getElementsByClassName('code-css')][0].style.zIndex = 2;
    [...document.getElementsByClassName('code-js')][0].style.zIndex = 2;
    [...document.getElementsByClassName('output')][0].style.zIndex = 3;
    try{
     [...document.getElementsByClassName('output')][0].contentWindow.document.body.innerHTML = '';
     [...document.getElementsByClassName('output')][0].contentWindow.document.write(
     [...document.getElementsByClassName('code-html')][0].value);
     (([...document.getElementsByClassName('output')][0]
               .contentWindow.document) || ([...document.getElementsByClassName('output')][0]
               .contentDocument)).head.innerHTML = '<style>' +
               [...document.getElementsByClassName('code-css')][0].value + '</style>';
     (0,eval)([...document.getElementsByClassName('code-js')][0].value);
    }catch(ex){(([...document.getElementsByClassName('output')][0]
               .contentWindow.document) || ([...document.getElementsByClassName('output')][0]
               .contentDocument)).body.innerHTML =
               '<p style="color:#fff">' + ex.message + '</p>';}
   }else if(el.classList.contains('t-files')){
    [...document.getElementsByClassName('files')][idx].style.zIndex = 3;
    [...document.getElementsByClassName('code-html')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('code-css')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('code-js')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('output')][idx].style.zIndex = 1;
   }
  };
 });
 
 document.getElementById('filereader').onchange = function(e){
  let reader = new FileReader();
  reader.onload = function(evt){
   files = JSON.parse(evt.target.result);
   for(let k in files){
    currentFile = k;
    break;
   }
   [...document.getElementsByClassName('code-html')][0].value = files[currentFile]['html'];
   [...document.getElementsByClassName('code-css')][0].value = files[currentFile]['css'];
   [...document.getElementsByClassName('code-js')][0].value = files[currentFile]['js'];
  };
  reader.readAsText(e.target.files[0]);
 }
 
 let ctrl = false;
 window.onkeydown = function(e){
  if(e.keyCode === 17){
   ctrl = true;
  }else if(e.keyCode === 220 && ctrl === true){
   save({'keyCode':13,'preventDefault':function(){}});
   const a = document.createElement('a');
   a.setAttribute('download','profile.lame');
   a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(files)));
   a.style.display = 'none';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   ctrl = false;
  }else if(e.keyCode === 221 && ctrl === true){
   document.getElementById('filereader').click();
   ctrl = false;
  }
 };
 window.onkeyup = function(e){
  if(e.keyCode === 17){ctrl = false;}
 };
};
