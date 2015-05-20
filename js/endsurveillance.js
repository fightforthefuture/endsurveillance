var url = 'https://spreadsheets.google.com/feeds/list/1mlikLyRrxlJDiPanWKLXbp6sUvRRsN8P_D1yWGZVc-k/default/public/values?alt=json';

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4)
    {
        var res = JSON.parse(xhr.response);

        var politicians = [];

        for (var i=0; i < res.feed.entry.length; i++) {
            var entry = res.feed.entry[i];
            politicians.push({
                first_name:         entry['gsx$first']['$t'].trim(),
                last_name:          entry['gsx$name']['$t'].trim(),
                image:              entry['gsx$imagepleasedontedit']['$t'].trim(),
                bioguide:           entry['gsx$bioguide']['$t'].trim(),
                email:              entry['gsx$email']['$t'].trim(),
                phone:              entry['gsx$phone']['$t'].trim(),
                comments:           entry['gsx$comments']['$t'].trim(),
                organization:       entry['gsx$organization']['$t'].trim(),
                state:              entry['gsx$state']['$t'].trim(),
                status:             entry['gsx$status']['$t'].trim(),
                twitter:            entry['gsx$twitter']['$t'].trim(),
                support_reauth:     entry['gsx$supportreauth']['$t'].trim(),
                support_tmp_reauth: entry['gsx$supporttempreauth']['$t'].trim(),
                support_usaf:       entry['gsx$supportusaf']['$t'].trim(),
            });
        }
        var compare = function(a,b) {
            if (a.state < b.state)
                return -1;
            else if (a.state > b.state)
                return 1;
            return 0;
        }
        politicians.sort(compare);
        // console.log(politicians);

        for (var i = 0; i < politicians.length; i++) {
            addPolitician(politicians[i]);
        }
    }
}.bind(this);
xhr.open("get", url, true);
xhr.send();

var addPolitician = function(data) {
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');

    if (data.support_usaf.toLowerCase() == 'yes' || data.support_usaf.toLowerCase() == 'lean yes' || data.support_tmp_reauth.toLowerCase() == 'yes' || data.support_tmp_reauth.toLowerCase() == 'lean yes' || data.support_reauth.toLowerCase() == 'yes' || data.support_reauth.toLowerCase() == 'lean yes') {
        td1.className = 'bad';
    } else if (data.support_tmp_reauth.toLowerCase() == 'no' && data.support_reauth.toLowerCase() == 'no') {
        td1.className = 'good';
    } else if (
        ((data.support_usaf.toLowerCase() == 'no' || data.support_usaf.toLowerCase() == 'lean no') && data.support_reauth.toLowerCase() != 'yes' && data.support_reauth.toLowerCase() != 'lean yes' && data.support_tmp_reauth.toLowerCase() != 'yes' && data.support_tmp_reauth.toLowerCase() != 'lean yes')
        ||
        (data.support_usaf.toLowerCase() != 'yes' && data.support_usaf.toLowerCase() != 'lean yes' && (data.support_reauth.toLowerCase() == 'no' || data.support_reauth.toLowerCase() == 'lean no' || data.support_tmp_reauth.toLowerCase() == 'no' || data.support_tmp_reauth.toLowerCase() == 'lean no'))
    ) {
        td1.className = 'good';
    }
    td1.style.backgroundImage = 'url(congress/'+data.image+')';
    var a = document.createElement('a');
    a.href = 'https://www.congress.gov/member/senator/'+data.bioguide;
    a.target = '_blank';
    var strong  = document.createElement('strong');
    strong.textContent = data.first_name + ' ' + data.last_name;
    a.appendChild(strong);
    if (td1.className == 'good') {
        var img = document.createElement('img');
        img.src = 'images/star.png';
        td1.appendChild(img);
    }
    td1.appendChild(a);
    tr.appendChild(td1);

    var td2 = document.createElement('td');
    td2.className = 'state';
    td2.textContent = data.state;
    tr.appendChild(td2);

    var td4 = document.createElement('td');
    td4.className = 'endorse';
    var textContent = '';
    if (data.support_tmp_reauth.toLowerCase() == 'yes' || data.support_tmp_reauth.toLowerCase() == 'lean yes' || data.support_reauth.toLowerCase() == 'yes'|| data.support_reauth.toLowerCase() == 'lean yes') {
        td4.className = 'bad';
        var textContent = 'YES';
    } else if ((data.support_tmp_reauth.toLowerCase() == 'no' || data.support_tmp_reauth.toLowerCase() == 'lean no') && (data.support_reauth.toLowerCase() == 'no' || data.support_reauth.toLowerCase() == 'lean no')) {
        td4.className = 'good';
        var textContent = 'NO';
    }
    var em = document.createElement('em');
    em.textContent = textContent;
    td4.appendChild(em);
    if (textContent) {
        var span = document.createElement('span');
        span.textContent = 'on renewing PATRIOT Act';
        td4.appendChild(span);
    }
    tr.appendChild(td4);

    var td3 = document.createElement('td');
    td3.className = 'endorse';
    if (data.support_usaf.toLowerCase() == 'yes')
        td3.className = 'bad';
    else if (data.support_usaf.toLowerCase() == 'lean yes')
        td3.className = 'halfbad';
    else if (data.support_usaf.toLowerCase() == 'no')
        td3.className = 'good';
    else if (data.support_usaf.toLowerCase() == 'lean no')
        td3.className = 'halfgood';
    var em2 = document.createElement('em');
    em2.textContent = data.support_usaf.toUpperCase().replace('LEAN', 'LEANS');
    td3.appendChild(em2);
    if (data.support_usaf) {
        var span2 = document.createElement('span');
        var iem2 = document.createElement('em');
        iem2.textContent = 'on ';
        span2.appendChild(iem2);
        var ia2 = document.createElement('a');
        ia2.href = '#usaf';
        ia2.textContent = 'USA Freedom Act';
        span2.appendChild(ia2);
        td3.appendChild(span2);
    }
    tr.appendChild(td3);

    if (!data.phone)
        var phone = '202-224-3121';
    else
        var phone = data.phone

    var td5 = document.createElement('td');
    var ul = document.createElement('ul');
    var li1 = document.createElement('li');
    var a1 = document.createElement('a');
    a1.href = 'tel://' + phone;
    a1.textContent = phone;
    li1.appendChild(a1);
    ul.appendChild(li1);

    if (data.twitter) {
        var li3 = document.createElement('li');
        var a3 = document.createElement('a');
        a3.href = 'https://twitter.com/' + data.twitter;
        a3.textContent = '@' + data.twitter;
        a3.target = '_blank';
        li3.appendChild(a3);
        ul.appendChild(li3);

        a3.addEventListener('click', function(e) {
            e.preventDefault();
            var username = a3.href.substr(20);
            window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(".@"+username+TWEET_TO_TEXT));
        }, false);
    }

    if (data.email) {
        var li2 = document.createElement('li');
        var a2 = document.createElement('a');
        a2.href = data.email;
        a2.textContent = 'Email';
        a2.target = '_blank';
        li2.appendChild(a2);
        ul.appendChild(li2);
    }

    td5.appendChild(ul);
    tr.appendChild(td5);
    document.getElementById('table').appendChild(tr);
}

document.querySelector('#cta form').addEventListener('submit', function(e) {
    e.preventDefault();

    var error = false;

    var first_name = document.getElementById('cta_first_name');
    var email = document.getElementById('cta_email');
    var address1 = document.getElementById('cta_street_address');
    var zip = document.getElementById('cta_postcode');

    var add_error = function(el) {
        console.log('error: ', el);
        el.className = 'error';
        error = true;
    };

    if (!first_name.value) add_error(first_name);
    if (!email.value) add_error(email);
    if (!address1.value) add_error(address1);
    if (!zip.value) add_error(zip);

    if (error) return alert('Please fill out all fields :)');

    var data = new FormData();
    data.append('guard', '');
    data.append('hp_enabled', true);
    data.append('member[first_name]', first_name.value);
    data.append('member[email]', email.value);
    data.append('member[street_address]', address1.value);
    data.append('member[postcode]', zip.value);
    data.append('action_comment', 'Please overturn Section 215 of the PATRIOT Act and Section 702 of the Foreign Intelligence Surveillance Act. These legal rules have been twisted by government agencies to allow mass spying of U.S. citizens without a warrant or any suspicion of wrongdoing. The so-called USA FREEDOM Act would only make matters worse, by creating new legal loopholes for the NSA and law enforcement agencies to collect even more data on millions of Americans. I am calling on you to oppose the USA FREEDOM Act, let the PATRIOT Act expire, and end mass surveillance by the U.S. government.');
    data.append('subject', 'Please oppose the USA FREEDOM Act and end mass surveillance.');
    data.append('org', 'fftf');
    data.append('subject', 'endsurveillance');
    data.append('tag', 'endsurveillance');

    var url = 'https://queue.fightforthefuture.org/action';
    show_modal('thanks_modal');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log('response:', xhr.response);
        }
    }.bind(this);
    xhr.open("post", url, true);
    xhr.send(data);

    document.getElementById('fields').style.display = 'none';
    document.getElementById('cta_thanks').style.display = 'block';
    
}, false);

var validate_phone = function(num) {
    num = num.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
    num = num.replace("+", "").replace(/\-/g, '');

    if (num.charAt(0) == "1")
        num = num.substr(1);

    if (num.length != 10)
        return false;

    return num;
};

document.querySelector('#call').addEventListener('submit', function(e) {
    e.preventDefault();

    var phone = document.getElementById('phone').value;

    if (!validate_phone(phone))
        return alert('Please enter a valid US phone number!');

    var data = new FormData();
    data.append('campaignId', 'endsurveillance');
    data.append('zipcode', document.getElementById('zip').value);
    data.append('userPhone', validate_phone(phone));

    var url = 'https://call-congress.fightforthefuture.org/create';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log('sent!', xhr.response);
        }
    }.bind(this);
    xhr.open("post", url, true);
    xhr.send(data);
    
    window.location.href = '#askthem';
    document.getElementById('phone_cta').style.display = 'none';
    document.getElementById('calling').style.display = 'block';

}, false);

document.querySelector('#thanks_modal form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Call submit');

    var phone = document.getElementById('call_phone').value;

    if (!validate_phone(phone))
        return alert('Please enter a valid US phone number!');

    var data = new FormData();
    data.append('campaignId', 'endsurveillance');
    data.append('zipcode', document.getElementById('cta_postcode').value);
    data.append('userPhone', validate_phone(phone));

    var url = 'https://call-congress.fightforthefuture.org/create';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log('sent!', xhr.response);
        }
    }.bind(this);
    xhr.open("post", url, true);
    xhr.send(data);

    hide_modal('thanks_modal');
    show_modal('calling_modal');

}, false);

document.getElementById('petition_link').addEventListener('click', function(e) {
    e.preventDefault();
    show_modal('petition_modal');
}, false);

document.getElementById('tweet_paul').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(PAUL_TWEET_TEXT));
}, false);

document.getElementById('tweet_wyden').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(WYDEN_TWEET_TEXT));
}, false);

document.getElementById('cta_call').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '#askthem';
}, false);

var show_modal = function(el) {
    var overlay = document.getElementById(el);
    overlay.style.display = 'block';
    setTimeout(function() { overlay.className = 'overlay'; }, 30);
}

var hide_modal = function(el) {
    var overlay = document.getElementById(el);
    overlay.className = 'overlay invisible';
    setTimeout(function() { overlay.style.display = 'none'; }, 400);
}

var bind_hide = function(el) {
    document.querySelector('#'+el+' .close.lite').addEventListener(
        'click', function(e) {
            e.preventDefault();
            hide_modal(el);
        }, false
    );
}

var close_modals = ['thanks_modal', 'calling_modal', 'petition_modal'];

for (var i=0; i<close_modals.length; i++)
    bind_hide(close_modals[i]);

var fb = document.querySelectorAll('a.facebook');
for (var i = 0; i < fb.length; i++) {
    fb[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.endsurveillance.com%2F' + (e.target.className.indexOf('protest') != -1 ? '%3Fprotest%3D1' : ''));
    }, false);
}

var tws = document.querySelectorAll('a.twitter');
for (var i = 0; i < tws.length; i++) {
    tws[i].addEventListener('click', function(e) {
        e.preventDefault();
        var text = TWEET_TEXT;
        if (e.target.className.indexOf('protest') != -1)
            text = PROTEST_TWEET_TEXT;
        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(text));
    }, false);
}

// var tocTop = document.getElementById('toc').getBoundingClientRect().top;  
var tocTop = document.getElementById('toc').offsetTop;

window.onscroll = function(e) {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (scrollTop >= tocTop)
        document.getElementById('toc').className = 'fixed';
    else
        document.getElementById('toc').className = '';
}


if (window.location.href.indexOf('thanks=1') != -1)
    show_modal('thanks_modal');

if (window.location.href.indexOf('petition=1') != -1)
    show_modal('petition_modal');

if (window.location.href.indexOf('protest=1') != -1)
    window.location.href = '#protest';