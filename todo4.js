$(function(){

	let viewEl = $("#viewList");
	let inputEl = $("#todoInput");

	//HTML読み込み時にストレージから表示
	let storageList = localStorage["todo.list"];
	if(storageList){
		JSON.parse(storageList).forEach(function(itemEl){
			addTodo(itemEl.text,itemEl.complete);
		});
	}

	//Todoを追加する関数
	function addTodo(text,isComplete){
		//リストアイテムを作成
		let liEl = $("<li>");
		let textEl = $('<span id = "text" contenteditable="true">').text(text);
		let checkboxEl = $('<input type = "checkbox">');
		let deleteEl = $('<button id = "deletebtn">削除</button>');
		let editEl = $('<button id = "editbtn">確定</button>')

		//完了の場合
		if(isComplete){
			liEl.addClass("complete");
			checkboxEl.attr("checked",true);
		}

		//追加する要素の作成
		liEl.append(checkboxEl).append(textEl).append(editEl).append(deleteEl);

		//リストに追加する
		viewEl.prepend(liEl);

		//チェックボックスをクリックしたとき
		checkboxEl.click(function(){
			if($(this).is(":checked")){
				liEl.addClass("complete");
			}
			else{
				liEl.removeClass("complete");
			}
			//LocalStorageを更新
			updateStorage();
		});

		//削除ボタンが押されたとき
		deleteEl.click(function(){
			//アラート表示
			if(window.confirm("削除してもよろしいですか？")){
				liEl.remove();
			}
			//LocalStorageを更新
			updateStorage();
		});

		//確定ボタンが押されたとき
		editEl.click(function(){
			//LocalStorageを更新
			updateStorage();
		});
	}

	//フォームを送信したとき
	$("#todoForm").bind("submit",function(e){
		//フォームのデフォルトの動きを止める？
		e.preventDefault();

		//入力文字を取得
		let text = inputEl.val();

		//入力がなかった場合追加しない
		if(text === ""){
			return;
		}

		//<ul>に追加
		addTodo(text);

		//テキストボックスを空に
		inputEl.val("");

		//LocalStorageを更新
		updateStorage();
	});

	//LocalStorageを更新
	function updateStorage(){
		let storage = [];

		//現在のリストを全て取得
		viewEl.find("li").each(function(){
			let itemEl = $(this);

			//テキストとチェックボックスの状態を保存
			storage.push({
				text:itemEl.find("#text").text(),
				complete:itemEl.hasClass("complete")
			});
		});
		//文字列にして保存
		localStorage["todo.list"] = JSON.stringify(storage);
	}
});