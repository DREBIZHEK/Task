function clearFields() {
    $(`#nameIn`).val('');
    $(`#countIn`).val('');
    $(`#priceIn`).val('');
}

function changeButtonType(type) {
    $('#accept').html(type);
    $('#accept').attr('type', type);
}

function updateRow({ num, name, count, price }) {
    let newPrice = price.split(/[,$]/g).join('');

    $(`#nameAdd${num}`).html(name);
    $(`#countAdd${num}`).html(count);
    $(`#priceAdd${num}`).html(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'USD' }).format(newPrice));
}

function createRow(num) {
    $('#myTable tr:last').after(rowTemplate(num));
}

function rowTemplate(num) {
    return `<tr id="tr${num}">
                <td class="flex"> 
                    <span id="nameAdd${num}">Name </span> 
                    <span id="countAdd${num}">0</span>
                </td>
                <td id="priceAdd${num}" align="center">Price
                </td>
                <td>
                    <button id="${num}editBut" class="ebutton">Edit</button>
                    <button id="${num}delBut" class="dbutton">Delete</button>
                </td>
            </tr>`
}

function valid() {
    $('#nameIn').removeClass('invalid')
    $('#invalidName').addClass('hidden')
    $('#countIn').removeClass('invalid')
    $('#invalidCount').addClass('hidden')
    $('#priceIn').removeClass('invalid')
    $('#invalidPrice').addClass('hidden')
}