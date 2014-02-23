function saveNick() {
    var nickInput = $(nick).val();

    if (nickInput != '') {
        window.localStorage.setItem("nick", $(nick).val(), false);
        return true;
    } else {
        alert('sorry, we need a nickname, bro!');
        return false;
    }
}
