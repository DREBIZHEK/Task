"use strict"

$('#nameIn').on('change', function() {

    valid()
    let name = $('#nameIn').val();
    if ((name.length < 16) && name && (/\S+$/.test(name))) {
        valid()
    } else {
        valid()
        $('#nameIn').addClass('invalid')
        $('#invalidName').removeClass('hidden')
        $('#invalidName').addClass('invalidNameType')
    }
})

$('#countIn').on('change', function() {

    valid()
    let count = $('#countIn').val();
    if (count) {
        valid()
    } else {
        valid()
        $('#countIn').addClass('invalid')
        $('#invalidCount').removeClass('hidden')
        $('#invalidCount').addClass('invalidCount')
    }
})

$('#priceIn').on('change', function() {

    valid()
    let price = $('#priceIn').val();
    if (price) {
        valid()
    } else {
        valid()
        $('#priceIn').addClass('invalid')
        $('#invalidPrice').removeClass('hidden')
        $('#invalidPrice').addClass('invalidPrice')
    }
})

$('#accept').on('click', function() {
    if ($('#accept').attr('type') === 'Add') {
        let name = $('#nameIn').val();
        let count = $('#countIn').val();
        let price = $('#priceIn').val();
        if ((name.length < 16) && name && price && count && (/\S+$/.test(name))) {
            let num = Math.floor(Math.random() * 1000);
            data.push({ name, count, price, num });
            createRow(num);
            updateRow({ name, count, price, num });
            valid()
            clearFields();
            $('.popup-closeAdd').click(function() {
                $(this).parents('.popup-fadeAdd').fadeOut();
                return false;
            });
        } else if (!name || name.length > 15 || !(/\S+$/.test(name))) {
            valid()
            $('#nameIn').addClass('invalid')
            $('#invalidName').removeClass('hidden')
            $('#invalidName').addClass('invalidNameType')
        } else if (!count) {
            valid()
            $('#countIn').addClass('invalid')
            $('#invalidCount').removeClass('hidden')
            $('#invalidCount').addClass('invalidCount')
        } else if (!price) {
            valid()
            $('#priceIn').addClass('invalid')
            $('#invalidPrice').removeClass('hidden')
            $('#invalidPrice').addClass('invalidPrice')

        }

    }

})


$("#myTable").on('click', '.ebutton', function(event) {
    let id1 = $(this).attr('id');
    let numid = parseInt(id1);

    const currentItem = data.find(function(item) {
        return item.num == numid;
    })

    $('#nameIn').val(currentItem.name);
    $('#countIn').val(currentItem.count);
    $('#priceIn').val(currentItem.price.split(/[,$]/g).join(''));

    $('#accept').attr('rowId', numid);

    changeButtonType('Update')

})


$('#accept').on('click', function() {
    if ($('#accept').attr('type') === 'Update') {
        const options = {
            num: $('#accept').attr('rowId'),
            name: $('#nameIn').val(),
            count: $('#countIn').val(),
            price: $('#priceIn').val(),
        }
        if ((options.name.length < 16) && options.name && options.price && options.count && (/\S+$/.test(options.name))) {
            data = data.map(function(item) {
                if ($('#accept').attr('rowId') == item.num) {
                    return options
                }

                return item;
            })
            $(`#tr${options.num}`).remove()
            createRow(options.num)
            updateRow(options)
            valid()
            $('.popup-closeAdd').click(function() {
                $(this).parents('.popup-fadeAdd').fadeOut();
                return false;
            });


        } else if (!options.name || options.name.length > 15 || !(/\S+$/.test(options.name))) {
            valid()
            $('#nameIn').addClass('invalid')
            $('#invalidName').removeClass('hidden')
            $('#invalidName').addClass('invalidNameType')
        } else if (!options.count) {
            valid()
            $('#countIn').addClass('invalid')
            $('#invalidCount').removeClass('hidden')
            $('#invalidCount').addClass('invalidCount')
        } else if (!options.price) {
            valid()
            $('#priceIn').addClass('invalid')
            $('#invalidPrice').removeClass('hidden')
            $('#invalidPrice').addClass('invalidPrice')

        }
    }
})

$('#addNewButton').on('click', function() {
    changeButtonType('Add');
    clearFields();
})

$("#myTable").on('click', '#sortName1', function() {

    data = data.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    });
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButtonRevers');
    $(this).attr('id', 'sortName2');


})

$("#myTable").on('click', '#sortName2', function() {
    data = data.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    });
    data = data.reverse();
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButton');
    $(this).attr('id', 'sortName1');

})

$("#myTable").on('click', '#sortPrice1', function() {

    data = data.sort((a, b) => a.price - b.price);
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButtonRevers');
    $(this).attr('id', 'sortPrice2');
})

$("#myTable").on('click', '#sortPrice2', function() {

    data = data.sort((a, b) => a.price - b.price);
    data = data.reverse();
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButton');
    $(this).attr('id', 'sortPrice1');
})

$('#searchIn').on('change', function() {

    let str = $('#searchIn').val()
    if (!str || !(/\S+$/.test(str))) {
        data.forEach(function(item) {
            $(`#tr${item.num}`).removeClass('hidden')
        })
    }

})

$('#searchButton').on('click', function() {
    let str = $('#searchIn').val()
    data.forEach(function(item) {
        $(`#tr${item.num}`).removeClass('hidden')
    })
    if (str && (/\S+$/.test(str))) {
        data.forEach(function(item) {

            if (item.name.indexOf(str) < 0) {
                $(`#tr${item.num}`).addClass('hidden')
            }
        })

    } else {
        data.forEach(function(item) {
            $(`#tr${item.num}`).removeClass('hidden')
        })
        $('#searchIn').val('')
    }

})



$("#myTable").on('click', '.dbutton', function() {
    $('.popup-fadeDel').fadeIn();
    let id1 = $(this).attr('id');
    let numid = parseInt(id1);
    $('#okButton').on('click', function() {
        $(`#tr${numid}`).remove();
    })
    return false;
});

$('.popup-closeDel').click(function() {
    $(this).parents('.popup-fadeDel').fadeOut();
    return false;
});

$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        e.stopPropagation();
        $('.popup-fadeDel').fadeOut();
    }
});

$('.popup-fadeDel').click(function(e) {
    if ($(e.target).closest('.popupDel').length == 0) {
        $(this).fadeOut();
    }
});
$("#myTable").on('click', '.ebutton', function() {
    $('.popup-fadeAdd').fadeIn();
    return false;
})


$("#addNewButton").on('click', function() {
    $('.popup-fadeAdd').fadeIn();
    return false;
});


$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        e.stopPropagation();
        $('.popup-fadeAdd').fadeOut();
    }
});

$('.popup-fadeAdd').click(function(e) {
    if ($(e.target).closest('.popupAdd').length == 0) {
        $(this).fadeOut();
    }
});
$(document).keydown(function(e) {

    if (e.keyCode == 13) {
        $('#accept').click();
    }
})