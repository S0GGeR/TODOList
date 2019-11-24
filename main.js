const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

$(function(){
	$('.addButton').click(addItem);
	ShowItemsPHP();
	setInterval(ShowItemsPHP, 10000);
    })
	

	
	


class item{
	constructor(itemName,itemID){
		this.createDiv(itemName, itemID);
	}

	createDiv(itemName,itemID){
		let input = document.createElement('input');
		input.value = itemName;
		input.disabled = true;
		input.classList.add('item_input');
		input.type = "text";
		input.id = itemID;

		let itemBox = document.createElement('div');
		itemBox.classList.add('item');
		itemBox.id = itemID;

		let editButton = document.createElement('button');
		editButton.innerHTML = "Редактировать";
		editButton.classList.add('editButton');

		let removeButton = document.createElement('button');
		removeButton.innerHTML = "Удалить";			
		removeButton.classList.add('removeButton');

		container.appendChild(itemBox);

		itemBox.appendChild(input);
		itemBox.appendChild(editButton);
		itemBox.appendChild(removeButton);

		editButton.addEventListener('click',() => this.edit(input));

		removeButton.addEventListener('click', () => this.remove(itemBox));
	}

	edit(input){	
	input.disabled = !input.disabled;	
		if (input.disabled)
			$.ajax({
	 			type: "PUT",
	  		    url: 'main.php',
	  			data: 'editItem=' + input.value + '&itemID=' + input.id,
      			 error: () => {
                    alert("Something wrong. Try it later");
                }
			});
	}


	

	remove(item){
		$.ajax({
	  		type: "DELETE",
	 		 url: 'main.php',
	  		data: 'itemID=' + item.id,
	 		 success: () => {
                   container.removeChild(item);
                },
      		 error: () => {
                    alert("Something wrong. Try it later");
                }
		});		
	}
}


function addItem(itemID){
	if(input.value != ""){
		$.ajax({
	  		type: "POST",
	 		url: 'main.php',
	  		data: 'addItem=' + input.value,
	 		success: () => {
                   new item(input.value, itemID);
				   input.value = "";
                },
      		error: () => {
                    alert("Something wrong. Try it later");
                }
		});		
		
	}
}

function ShowItems(items){
	if (items === null)
		return false;
	items = JSON.parse(items);
	allID = (Object.keys(items));
	for(i = 0; i != allID.length; ++i){
		let check = document.getElementById(allID[i]);
		if(check === null){
			break;
		}
		if (!check.disabled){
			return  false;
		} 
	}
	$(".item").remove();		
	for(i = 0; i != allID.length; ++i){
	new item(items[allID[i]].text, items[allID[i]].id);
	}

}

let ShowItemsPHP = function(){
	$.get('main.php?ShowItems', ShowItems);
}

