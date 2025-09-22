$("#allToggle").click(function () {
    const config = {
        all: $("#allToggle")[0].checked,
        position: $("#positionSelect").val(),
        scrollSpeed: parseInt($("#speedSlider").val())
    }

    chrome.runtime.sendMessage({
        "cmd": "setStatus",
        ...config
    })

    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            cmd: "updateConfig",
            ...config
        }, function (res) {})
    })
})

$("#positionSelect").change(function() {
    updateConfig()
})

$("#speedSlider").on('input', function() {
    $("#speedValue").text($(this).val() + 'px')
    updateConfig()
})

function updateConfig() {
    const config = {
        all: $("#allToggle")[0].checked,
        position: $("#positionSelect").val(),
        scrollSpeed: parseInt($("#speedSlider").val())
    }

    chrome.runtime.sendMessage({
        "cmd": "setStatus",
        ...config
    })

    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            cmd: "updateConfig",
            ...config
        }, function (res) {})
    })
}

chrome.runtime.sendMessage({
    "cmd": "checkStatus"
}, item => {
    if (item.all === undefined) {
        item = { all: true, position: 'bottom-right', scrollSpeed: 20 }
        chrome.runtime.sendMessage({
            "cmd": "setStatus",
            ...item
        })
    }

    $("#allToggle")[0].checked = item.all
    $("#positionSelect").val(item.position || 'bottom-right')
    $("#speedSlider").val(item.scrollSpeed || 20)
    $("#speedValue").text((item.scrollSpeed || 20) + 'px')
})

function setupL10N() {
    $("label.title-toggle").text(chrome.i18n.getMessage("popup_config_hide_all"))
    $("#goToUp_title").text(chrome.i18n.getMessage("popup_title"))
    $(".config-label:contains('Button Position:')").text(chrome.i18n.getMessage("popup_button_position"))
    $(".config-label:contains('Scroll Speed:')").text(chrome.i18n.getMessage("popup_scroll_speed"))

    // Update position select options
    $("#positionSelect option[value='bottom-right']").text(chrome.i18n.getMessage("popup_position_bottom_right"))
    $("#positionSelect option[value='right-center']").text(chrome.i18n.getMessage("popup_position_right_center"))
}

setupL10N()