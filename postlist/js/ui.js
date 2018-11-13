
const displayPosts = (postList) => {

    let $ul = document.querySelector('#post-list');

    for (let i = 0; i < postList.length; i++) {

        var $li = document.createElement('li');
        $li.textContent = postList[i].
    }
};

export {
    displayPosts
};