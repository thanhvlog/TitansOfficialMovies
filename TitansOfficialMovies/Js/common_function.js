const commonFunc = {
    showNotify: function(options,settings){
        $.notify({
            // options
            icon: 'fa fa-exclamation-triangle',
            title: options.title ? options.title : '',
            message: options.message ? options.message : '',
            url: options.url ? options.url : null,
            target: '_blank'
        },{
            // settings
            element: settings.element ? settings.element : 'body',
            position: null,
            type: settings.type ? settings.type : 'info',
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<p data-notify="message">{2}</p>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>' 
        });
    },
    getParameterByName: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    callAjax: function (params, callback) {
        $.ajax({
            method: params.method,
            url: params.url,
            data: params.data
        }).done(function(result) {
            callback(false,result);
        }).fail(function( jqXHR, textStatus ) {
            callback(true,null);
        });
    },
    keyBoardMapAll: function(keyCode){
        // names of known key codes (0-255)
        var keyboardMap = [
            "", // [0]
            "", // [1]
            "", // [2]
            "CANCEL", // [3]
            "", // [4]
            "", // [5]
            "HELP", // [6]
            "", // [7]
            "BACK_SPACE", // [8]
            "TAB", // [9]
            "", // [10]
            "", // [11]
            "CLEAR", // [12]
            "ENTER", // [13]
            "ENTER_SPECIAL", // [14]
            "", // [15]
            "SHIFT", // [16]
            "CONTROL", // [17]
            "ALT", // [18]
            "PAUSE", // [19]
            "CAPS_LOCK", // [20]
            "KANA", // [21]
            "EISU", // [22]
            "JUNJA", // [23]
            "FINAL", // [24]
            "HANJA", // [25]
            "", // [26]
            "ESCAPE", // [27]
            "CONVERT", // [28]
            "NONCONVERT", // [29]
            "ACCEPT", // [30]
            "MODECHANGE", // [31]
            "SPACE", // [32]
            "PAGE_UP", // [33]
            "PAGE_DOWN", // [34]
            "END", // [35]
            "HOME", // [36]
            "LEFT", // [37]
            "UP", // [38]
            "RIGHT", // [39]
            "DOWN", // [40]
            "SELECT", // [41]
            "PRINT", // [42]
            "EXECUTE", // [43]
            "PRINTSCREEN", // [44]
            "INSERT", // [45]
            "DELETE", // [46]
            "", // [47]
            "0", // [48]
            "1", // [49]
            "2", // [50]
            "3", // [51]
            "4", // [52]
            "5", // [53]
            "6", // [54]
            "7", // [55]
            "8", // [56]
            "9", // [57]
            "COLON", // [58]
            "SEMICOLON", // [59]
            "LESS_THAN", // [60]
            "EQUALS", // [61]
            "GREATER_THAN", // [62]
            "QUESTION_MARK", // [63]
            "AT", // [64]
            "A", // [65]
            "B", // [66]
            "C", // [67]
            "D", // [68]
            "E", // [69]
            "F", // [70]
            "G", // [71]
            "H", // [72]
            "I", // [73]
            "J", // [74]
            "K", // [75]
            "L", // [76]
            "M", // [77]
            "N", // [78]
            "O", // [79]
            "P", // [80]
            "Q", // [81]
            "R", // [82]
            "S", // [83]
            "T", // [84]
            "U", // [85]
            "V", // [86]
            "W", // [87]
            "X", // [88]
            "Y", // [89]
            "Z", // [90]
            "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
            "", // [92]
            "CONTEXT_MENU", // [93]
            "", // [94]
            "SLEEP", // [95]
            "NUM0", // [96]
            "NUM1", // [97]
            "NUM2", // [98]
            "NUM3", // [99]
            "NUM4", // [100]
            "NUM5", // [101]
            "NUM6", // [102]
            "NUM7", // [103]
            "NUM8", // [104]
            "NUM9", // [105]
            "MULTIPLY", // [106]
            "ADD", // [107]
            "SEPARATOR", // [108]
            "SUBTRACT", // [109]
            "DECIMAL", // [110]
            "DIVIDE", // [111]
            "F1", // [112]
            "F2", // [113]
            "F3", // [114]
            "F4", // [115]
            "F5", // [116]
            "F6", // [117]
            "F7", // [118]
            "F8", // [119]
            "F9", // [120]
            "F10", // [121]
            "F11", // [122]
            "F12", // [123]
            "F13", // [124]
            "F14", // [125]
            "F15", // [126]
            "F16", // [127]
            "F17", // [128]
            "F18", // [129]
            "F19", // [130]
            "F20", // [131]
            "F21", // [132]
            "F22", // [133]
            "F23", // [134]
            "F24", // [135]
            "", // [136]
            "", // [137]
            "", // [138]
            "", // [139]
            "", // [140]
            "", // [141]
            "", // [142]
            "", // [143]
            "NUM_LOCK", // [144]
            "SCROLL_LOCK", // [145]
            "WIN_OEM_FJ_JISHO", // [146]
            "WIN_OEM_FJ_MASSHOU", // [147]
            "WIN_OEM_FJ_TOUROKU", // [148]
            "WIN_OEM_FJ_LOYA", // [149]
            "WIN_OEM_FJ_ROYA", // [150]
            "", // [151]
            "", // [152]
            "", // [153]
            "", // [154]
            "", // [155]
            "", // [156]
            "", // [157]
            "", // [158]
            "", // [159]
            "CIRCUMFLEX", // [160]
            "EXCLAMATION", // [161]
            "DOUBLE_QUOTE", // [162]
            "HASH", // [163]
            "DOLLAR", // [164]
            "PERCENT", // [165]
            "AMPERSAND", // [166]
            "UNDERSCORE", // [167]
            "OPEN_PAREN", // [168]
            "CLOSE_PAREN", // [169]
            "ASTERISK", // [170]
            "PLUS", // [171]
            "PIPE", // [172]
            "HYPHEN_MINUS", // [173]
            "OPEN_CURLY_BRACKET", // [174]
            "CLOSE_CURLY_BRACKET", // [175]
            "TILDE", // [176]
            "", // [177]
            "", // [178]
            "", // [179]
            "", // [180]
            "VOLUME_MUTE", // [181]
            "VOLUME_DOWN", // [182]
            "VOLUME_UP", // [183]
            "", // [184]
            "", // [185]
            "SEMICOLON", // [186]
            "EQUALS", // [187]
            "COMMA", // [188]
            "MINUS", // [189]
            "PERIOD", // [190]
            "SLASH", // [191]
            "BACK_QUOTE", // [192]
            "", // [193]
            "", // [194]
            "", // [195]
            "", // [196]
            "", // [197]
            "", // [198]
            "", // [199]
            "", // [200]
            "", // [201]
            "", // [202]
            "", // [203]
            "", // [204]
            "", // [205]
            "", // [206]
            "", // [207]
            "", // [208]
            "", // [209]
            "", // [210]
            "", // [211]
            "", // [212]
            "", // [213]
            "", // [214]
            "", // [215]
            "", // [216]
            "", // [217]
            "", // [218]
            "OPEN_BRACKET", // [219]
            "BACK_SLASH", // [220]
            "CLOSE_BRACKET", // [221]
            "QUOTE", // [222]
            "", // [223]
            "META", // [224]
            "ALTGR", // [225]
            "", // [226]
            "WIN_ICO_HELP", // [227]
            "WIN_ICO_00", // [228]
            "", // [229]
            "WIN_ICO_CLEAR", // [230]
            "", // [231]
            "", // [232]
            "WIN_OEM_RESET", // [233]
            "WIN_OEM_JUMP", // [234]
            "WIN_OEM_PA1", // [235]
            "WIN_OEM_PA2", // [236]
            "WIN_OEM_PA3", // [237]
            "WIN_OEM_WSCTRL", // [238]
            "WIN_OEM_CUSEL", // [239]
            "WIN_OEM_ATTN", // [240]
            "WIN_OEM_FINISH", // [241]
            "WIN_OEM_COPY", // [242]
            "WIN_OEM_AUTO", // [243]
            "WIN_OEM_ENLW", // [244]
            "WIN_OEM_BACKTAB", // [245]
            "ATTN", // [246]
            "CRSEL", // [247]
            "EXSEL", // [248]
            "EREOF", // [249]
            "PLAY", // [250]
            "ZOOM", // [251]
            "", // [252]
            "PA1", // [253]
            "WIN_OEM_CLEAR", // [254]
            "" // [255]
        ];
        return keyboardMap[keyCode];
    },
    waitForEl: function(selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function() {
            commonFunc.waitForEl(selector, callback);
            }, 100);
        }
    },
    debugger: function() {
        debugger;
    },
    clearConsole: function() {
        console.clear();
        setTimeout(commonFunc.clearConsole, 100);
    }
}