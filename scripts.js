function selectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    
    console.log(text)
    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function showSuccessMessage() {
    
    $('#success-log').slideDown('fast');
    timer = setTimeout(() => {
        //$('#success-content').text("That's not a valid URL!");
        $('#success-log').slideUp('slow');
    }, 1500)
    $('#close-success-log').click(function(){
        clearTimeout(timer);
        $('#success-log').slideUp('slow');
    })

    return

}

function copyToClipboard() {
    const value = $('#url-host').text() + $('#url-path').text()
    console.log(value)
    var $temp = $('<input>')
    $('body').append($temp)
    $temp.val(value)
    $temp.select()
    document.execCommand('copy')
    $temp.remove()
}

function isUrl(str) {
    var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i') // fragment locator
    return pattern.test(str)
}

/////////////// START ////////////////////////////////////
$(document).ready(function(){
    let user_rate = 0;

    const GOOD_RATE = 1;
    const BAD_RATE = -1;
    const NORMAL_RATE = 0;

    $('#target-form').submit(function(event){
        event.preventDefault()
        const inputUrl = $('#input-url').val()

        if (!inputUrl || inputUrl.trim() === '' || !isUrl(inputUrl.trim())){ 
            console.log('Not an URL')
            $('#error-log').slideDown('fast')
            timer = setTimeout(() => {
                $('#error-content').text("That's not a valid URL!")
                $('#error-log').slideUp('slow')
            }, 1500)
            $('#close-error-log').click(function(){
                clearTimeout(timer)
                $('#error-log').slideUp('slow')

            })
            return
        } 

        $("#loading-wrapper").removeClass('hidden')
        const apiUrl = 'https://api.gii.gl/record/any_create'
    
        const reqBody = { url : inputUrl }
        $.ajax({
            method : 'POST',
            url : apiUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(reqBody),
        }).done(function(response){
            showSuccessMessage();
            $("#loading-wrapper").addClass('hidden')
            const {id, url, shortLink} = {...response}
            $('#url-path').text(`/${shortLink}`)
            $('#result').slideDown('fast')
            copyToClipboard()
            selectText('result-url')
        }).fail(function(xhr, status, error){
            console.log('Not an URL')
            $('#error-log').slideDown('fast')
            timer = setTimeout(() => {
                $('#error-content').text("Failed to shorten the URL. Something happens!")
                $('#error-log').slideUp('slow')
            }, 3000)
            $('#close-error-log').click(function(){
                clearTimeout(timer)
                $('#error-log').slideUp('slow')

            })
            return
        })
    })
//////////////////////////////////////////////////////////////////////////////////

    $('#close-button').click(function(){
        $('#input-url').val('')
        $(this).hide()
        $('#result').slideUp('fast')
    })

    $('#input-url').on('change keyup paste click', function(event){
        $('#result').slideUp('fast')
        const value = event.target.value
        if (value && value !== '' ) {
            $('#close-button').show()
        }   

        if (!value || value === '') {
            $('#close-button').hide()
        }
    })

    
    $('#copy-button').click(function() {
        copyToClipboard();

        $('.copied-message').slideDown('slow');

        setTimeout(() => {
            $('.copied-message').slideUp('slow');
        }, 1000)

      })
////////////////////////////////////////////////////////////////////////////////////////////

    $('.yes-button').click(function(){
       user_rate = GOOD_RATE;
       $(this).addClass('bg-blue-400 focus:outline-none border-none text-white');
       $('.partial-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
       $('.no-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
    })

    $('.no-button').click(function(){
        user_rate = BAD_RATE;
        $(this).addClass('bg-blue-400 focus:outline-none border-none text-white');
        $('.partial-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
        $('.yes-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
    })

    $('.partial-button').click(function(){
        user_rate = NORMAL_RATE;
        $(this).addClass('bg-blue-400 focus:outline-none border-none text-white');
        $('.yes-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
        $('.no-button').removeClass('bg-blue-400 focus:outline-none border-none text-white');
    })

    $('#feedback').click(function(){
        $(this).prop("selectionStart");
    })
////////////////////////////////////////////////////////////////////////////////////////////////

   
///////////////////////////////////////////////////////////////////////////////////////////////

$('.submit-feedback-button').click(function(){

    const apiUrl = 'https://api.gii.gl/user/feedback'

    const reqBody = { 
        feedback :  $('#feedback').val(),
        rate: user_rate
    }

    $('.feedback-title').text('Your feedback was sent');
    $('.feedback-form').addClass('hidden');
    $('.thanks-form').removeClass('hidden');

    console.log(reqBody);

    $.ajax({
        method : 'POST',
        url : apiUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(reqBody),
    }).done(function(response){
        console.log(response);
        $('.feedback-title').text('Your feedback was sent');
        $('.feedback-form').addClass('hidden');
        $('.thanks-form').removeClass('hidden');
        
    }).fail(function(xhr, status, error){
        console.log(error);
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////

      var openmodal = document.querySelectorAll('.modal-open')
      for (var i = 0; i < openmodal.length; i++) {
        openmodal[i].addEventListener('click', function(event){
          event.preventDefault()
          toggleModal()
        })
      }
      
      const overlay = document.querySelector('.modal-overlay')
      overlay.addEventListener('click', toggleModal)
      
      var closemodal = document.querySelectorAll('.modal-close')
      for (var i = 0; i < closemodal.length; i++) {
        closemodal[i].addEventListener('click', toggleModal)
      }
      
      document.onkeydown = function(evt) {
        evt = evt || window.event
        var isEscape = false
        if ("key" in evt) {
          isEscape = (evt.key === "Escape" || evt.key === "Esc")
        } else {
          isEscape = (evt.keyCode === 27)
        }
        if (isEscape && document.body.classList.contains('modal-active')) {
          toggleModal()
        }
      };
      
      function toggleModal () {
        const body = document.querySelector('body')
        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        body.classList.toggle('modal-active')
        $('.feedback-form').removeClass('hidden');
          $('.thanks-form').addClass('hidden');
      }

   

})

