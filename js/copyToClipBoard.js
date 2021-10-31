function copyToClipboard(){
    var text = document.getElementById("discordTAG");
    navigator.clipboard.writeText(text.innerHTML);    
}