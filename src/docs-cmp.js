let cmp_dialog = document.createElement("div");
let get_cursor = () => {
    try {
        return document.querySelector("#kix-current-user-cursor-caret")
            .parentElement;
    } catch {}
};

let cursor;
let insert_cmp_panel = () => {
    cursor = get_cursor();
    if (cursor === null) {
        console.log("not able to insert");
        insert_cmp_panel();
    }

    cmp_dialog.id = "cmp-dialog";
    cursor.style.animation = "unset !important";
    cursor.appendChild(cmp_dialog);
    console.log("inserted");
};

let character_buffer = "";
window.onload = () => {
    insert_cmp_panel();
    function isLetter(str) {
        return str.length === 1 && str.toLowerCase().match(/[a-z]/i);
    }
    let elem = document.querySelector(".docs-texteventtarget-iframe")
        .contentDocument.activeElement;
    elem.addEventListener("click", () => {
        character_buffer = "";
        cmp_dialog.innerHTML = "";
    });
    elem.addEventListener("keypress", (gfg) => {
        if (gfg.key === " ") {
            character_buffer = "";
            cmp_dialog.innerHTML = "";
            return;
        }
        if (!isLetter(gfg.key)) {
            return;
        }

        character_buffer += gfg.key;
        cmp_dialog.innerHTML = "";
        fuzzysort.go(character_buffer, topwords).forEach((e) => {
            let item = document.createElement("div");
            item.innerText = e.target;
            cmp_dialog.appendChild(item);
        });
    });
};
