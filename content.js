let topButton = $('<div id="gototop" name="myGTTButton" data-testid="back-to-top-button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg></div>')
let bottomButton = $('<div id="gotoBottom" name="myGTTButton" data-testid="back-to-top-button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg></div>')

let hoverScrollInterval = null
let hoverScrollSpeed = 20
let hoverScrollDelay = 500
let buttonPosition = 'bottom-right'
let isAutoScrolling = false
let hoverTimeout = null

window.addEventListener("load", function () {
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({
        cmd: "checkStatus",
        domain: document.domain
    }, function (res) {

        // Set base styles
        const baseStyles = {
            position: "fixed",
            height: "32px",
            width: "32px",
            'z-index': "2147483647",
            cursor: "pointer",
            "box-shadow": "rgb(97, 185, 232) 0px 0px 2px",
            "background-color": "rgba(10, 10, 10, 0.3)",
            "color": "rgba(255, 255, 255, 0.8)",
            "align-items": "center",
            "justify-content": "center",
            "display":"-webkit-flex"
        }

        topButton.css(baseStyles)
        bottomButton.css({...baseStyles, transform: "rotate(180deg)"})

        // Apply configuration
        if (res.scrollSpeed) hoverScrollSpeed = res.scrollSpeed
        if (res.position) buttonPosition = res.position
        updateButtonPositions()
        
        $('body').append(bottomButton);
        $('body').append(topButton);
        $('body').on('click', '#gototop', gotoTop);
        $('body').on('click', "#gotoBottom",gotoBottom)

        $('body').on('mouseenter', '#gototop', function() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => startAutoScroll('top'), hoverScrollDelay);
        });
        $('body').on('mouseleave', '#gototop', stopAutoScroll);

        $('body').on('mouseenter', '#gotoBottom', function() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => startAutoScroll('bottom'), hoverScrollDelay);
        });
        $('body').on('mouseleave', '#gotoBottom', stopAutoScroll);

        // Stop auto-scroll when leaving any button area
        $('body').on('mouseleave', 'div[name=myGTTButton]', stopAutoScroll);

        // Stop auto-scroll on manual interaction
        $(window).on('scroll', function() {
            if (!isAutoScrolling) {
                stopAutoScroll();
            }
        });
        $(document).on('mousedown touchstart', stopAutoScroll);

        $("div[name=myGTTButton]").hover(() => {
            $("div[name=myGTTButton]").css({
                "background-color": "rgba(10, 10, 10, 0.5)",
                "color": "rgba(255, 255, 255)" 
            })
        }, () => {
            $("div[name=myGTTButton]").css({
                "background-color": "rgba(10, 10, 10, 0.3)",
                "color": "rgba(255, 255, 255,0.8)" 
            }) 
        })
        checkStatus(res.all)
    });
});

const handleMessage = (request, sender, sendResponse) => {
    try {
        switch (request.cmd) {
            case "gototop":
                gotoTop()
                break;
            case "gotoBottom":
                gotoBottom()
                break
            case "checkStatus":
                checkStatus(request.all)
                break
            case "updateConfig":
                if (request.scrollSpeed) hoverScrollSpeed = request.scrollSpeed
                if (request.position) {
                    buttonPosition = request.position
                    updateButtonPositions()
                }
                if (request.all !== undefined) {
                    checkStatus(request.all)
                }
                break
            default:
                break
        }
    } catch (e) {
        console.error(e)
    }
}

function gotoTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
}

function gotoBottom(){
    $("html, body").animate({
        scrollTop: $(document).height()
    }, 'fast');
}

function startAutoScroll(direction) {
    stopAutoScroll()
    isAutoScrolling = true

    hoverScrollInterval = setInterval(() => {
        const currentScroll = $(window).scrollTop()
        const scrollAmount = direction === 'top' ? -hoverScrollSpeed : hoverScrollSpeed
        const targetScroll = currentScroll + scrollAmount

        if (direction === 'top' && targetScroll <= 0) {
            window.scrollTo(0, 0)
            stopAutoScroll()
        } else if (direction === 'bottom' && targetScroll >= $(document).height() - $(window).height()) {
            window.scrollTo(0, $(document).height())
            stopAutoScroll()
        } else {
            window.scrollBy(0, scrollAmount)
        }
    }, 16)
}

function stopAutoScroll() {
    clearTimeout(hoverTimeout);
    clearInterval(hoverScrollInterval)
    hoverScrollInterval = null
    isAutoScrolling = false
}

function updateButtonPositions() {
    if (buttonPosition === 'right-center') {
        topButton.css({
            bottom: '52%',
            right: '50px',
            transform: 'translateY(50%)'
        })
        bottomButton.css({
            bottom: '48%',
            right: '50px',
            transform: 'translateY(50%) rotate(180deg)',
            marginTop: '40px'
        })
    } else {
        topButton.css({
            bottom: '110px',
            right: '50px',
            transform: 'none'
        })
        bottomButton.css({
            bottom: '78px',
            right: '50px',
            transform: 'rotate(180deg)',
            marginTop: '0'
        })
    }
}

function checkStatus(status) {
    if (status) {
        if ($("body").height() > $(window).height()) {
            $("div[name=myGTTButton]").show();
            // Check current scroll position on page load
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                bottomButton.hide()
                topButton.show()
            } else if (window.scrollY <= 0) {
                bottomButton.show()
                topButton.hide()
            } else {
                bottomButton.show()
                topButton.show()
            }
        } else {
            $("div[name=myGTTButton]").hide();
        }
    } else {
        $("div[name=myGTTButton]").hide();
    }
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        bottomButton.hide()
        topButton.show()
    } else if ((window.scrollY) <= 0) {
        bottomButton.show()
        topButton.hide()
    } else { 
        bottomButton.show()
        topButton.show() 
    }
};