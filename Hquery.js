﻿
/*
		
			Author Pohang Technical High School 	
			
			Copyright (c) <2014> <tomxat7@gmail.com>
			
			Permission is hereby granted, free of charge, to any person
			obtaining a copy of this software and associated documentation
			files (the "Software"), to deal in the Software without
			restriction, including without limitation the rights to use,
			copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the
			Software is furnished to do so, subject to the following
			conditions:

			The above copyright notice and this permission notice shall be
			included in all copies or substantial portions of the Software.

			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
			EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
			OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
			NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
			HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
			WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
			FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
			OTHER DEALINGS IN THE SOFTWARE.

			
			Hquery는  웹 개발에 있어 시간 단축에 특화된  프로젝트입니다.
		
*/
			/*
				2014-05-25 tab change park jae Hyun2
				TODO
					1.현재 정확한 타입검사가 부족하기 때문에, 정규식을 이용한 
						DOM 요소의 특정한 값들을 검사하는 것이 필요로 합니다.
					2.현재는 DOM의 요소이면 해당 Style에 적용합니다.
					3.배포시 네임스페이스를 규정 할 것.
					4.현재 css API 만 제공
					5.프로토타입을 이용한 세부 구현을 필요로 합니다.
					
			*/
			if(this === window && (window.$ !== window.Hquery)){
				window.$ = window.Hquery = function $(selector /* @@ selector param: 요소를 선택한다. */){
				/*
					@method 	ready privillege 
						$선택자가 정상적으로 실행 되었는지 검사하는 콜백 함수.
				*/
				
				/*
					@@
						두번 째 호출시, 컨텍스트가 이미 할당되었을경우  경우에 따라 null을 반환하지 않고
						해당 객체를 반환해야만 한다.
				*/
				if(this  !== window){
						return null;
					
				}
				
				window.Hquery.version = window.$.version =  1.0 + "Version";
				
				/*
					@method  Stack_Tokenizer 
						토큰(#과 같은)들을 옳바르게 사용하였는지 검사하는 구문,  정규식을 사용하지 않았음.
						->정규식으로 대체 가능.
				*/
				
				var  Stack_Tokenizer = ( function(){
					var 	i,j,document_array = [];
					var selector_array = selector.split(",");
					var  for_Text = "", token_Find = false, Token = "", anti_Pattern = false;
						/*
							if((selector_array[i][j] .charCodeAt(0)  >=65 && selector_array[i][j] .charCodeAt(0)  <= 90)  || (selector_array[i][j] .charCodeAt(0)  >=97 && selector_array[i][j] .charCodeAt(0)  <= 122)  || 
							(selector_array[i][j] .charCodeAt(0)  >=48 && selector_array[i][j] .charCodeAt(0)  <= 57)){ 
								for_Text+= selector_array[i][j];
							}
							*/		
					for(i=0; i<selector_array.length; i++){
						for_Text = "", token_Find= false, Token = false, anti_Pattern = false;
						for(j=0; j< selector_array[i].length; j++){
							alert(1);
							if(!token_Find && (selector_array[i][j] === "#"  || selector_array[i][j] === ".")){
									token_Find = true;
									Token = selector_array[i][j];
							}
							else if((selector_array[i][j] .charCodeAt(0)  >=65 && selector_array[i][j] .charCodeAt(0)  <= 90)  || (selector_array[i][j] .charCodeAt(0)  >=97 && selector_array[i][j] .charCodeAt(0)  <= 122)  || 
							(selector_array[i][j] .charCodeAt(0)  >=48 && selector_array[i][j] .charCodeAt(0)  <= 57)){ 
									for_Text+= selector_array[i][j];
							}
							else if((token_Find && (selector_array[i][j] === "#"  || selector_array[i][j] === ".")) {
								anti_Pattern = true ;
								
								break;
							}
						}
						if(!Token || parseInt(for_Text.length, 10)	<	0){
							anti_Patter = true;
						}
						
						else if(anti_Pattern === false){
							
						switch(Token){
							case '#' : 
									
									document_array.push(document.getElementById(for_Text));
									break;
									
									
							case'.':
									
									document_array.push(document.getElementsByClassName(for_Text));
									break;
						
						}
					}
					else if(anti_Pattern === true){
							document_array.push("null");
					}
				}
				
					
					return  document_array;
				
				
				//	return document_array;
				})();
		//		alert(Stack_Tokenizer);
			
				var ready = function(){
					if(this !== window && window.document){
							alert("Hquery started!");
							return "Hquery"+version;
					}
				}
				
				
				/*
					
					@param attr 
						Style의 Attribute를 JSON 방식으로 참조한다. 
					@method (prvillege) css 
						DOM의 요소일 경우 @method attr 를 참조하여  JSON객체를 Style에 적용한다.
				
				*/
				
				var css = function(attr /* !comment */){
					var i,j;
					var json_Result = "";
					/*
						@@ 절대 불변식  
							처음과 마지막은 중괄호로 끝이 난다.
						!알림
							정규식을 사용하여 css method를 약 5라인 정도 줄일 수 있다.
					*/
					if( (JSON.stringify(attr)[0] === "{" )&& ( JSON.stringify(attr)[JSON.stringify(attr).length-1] === "}")){
						for(i=1; i<JSON.stringify(attr).length-1; i++){
					 
							json_Result += JSON.stringify(attr)[i];
					
						}
						/*
							@@ Array.prototype.split method
								공백을 제거하여 첫 번째 인자를 기준으로 나눈다.
									ex) sdfsdf sdfsdf ,	-> arr[0]: sdfsdfsdfsdf
						*/
						var json_arr = json_Result.split(",");
						var for_Text = "";		
						for(i=0; i<json_arr.length; i++){
							
							for(j=0; j<json_arr[i].length; j++){
								if(json_arr[i][j].charCodeAt(0) !== 34){
									for_Text += json_arr[i][j];
								}
							}
							if(json_arr[i][j-2] !== ";"){
				
								for_Text += ";";	
							}
							for_Text += "  ";
						}
						/*
							!알림
								JSON 객체의 형태가{{}{} } 와 같은 안티 패턴일 경우 제외시키는 정규식이 필요로 합니다.
								현재 상태일 경우에도 스타일시트에 잘못된 패턴을 입력하면 작동이 안되는 것처럼 작동합니다.
						*/
						try{
							for(i=Stack_Tokenizer.length-1;  i>=0;  i--){
								if(Stack_Tokenizer[i] !== "null"){
									Stack_Tokenizer[i].setAttribute("style",for_Text);
									alert(Stack_Tokenizer[i] );
									Stack_Tokenizer.pop();							
									
								}
							}
							if(!(Stack_Tokenizer.pop())){
								delete Stack_Tokenizer;
							}
						}
						catch(e){
							throw e;
						}
					}
					else{
						return false;
					}
				}
				/*
					!알림
						undefined로 검사하지 말 것, 노드타입이나 형태에 의존 할 것
						현재는 DOM의 요소이기만 하면 null을 반환하지 않고 특권 메서드를 참조 할 권한을 제공
				
				*/
				
			var  Stack_Tokenizer_Check = (function(){
				var i, count= 0 ,  Stack_Poper;
				for( i=Stack_Tokenizer.length-1; 	i>=0; 	i--){
					 Stack_Poper =  Stack_Tokenizer[i];
					if(Stack_Poper  === "null"){
						/* 논리적 구조 이용 -> 즉  비어있는 것이 정상*/
					}	
					else{
						count++;
					}
				}
				
				return 	((count >0) ? true : false);
			})();
			/*
				if(Stack_Tokenizer_Check()){
					return {
						ready: ready,
						css : css
					}
				}
				else{
					return null;
				}
			}*/
			
		}
			
