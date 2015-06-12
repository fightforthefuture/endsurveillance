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
    data.append('action_comment', 'It\'s an outrage that taxpayer funds are being used to fund a fleet of spy planes operated by the FBI and used to engage in mass surveillance of potentially hundreds of thousands of innocent Americans. These planes have been spotted over the Mall of America, where the FBI has used counterterrorism authorities to investigate political protestors for the #BlackLivesMatter movement. It is unacceptable to use resources meant to stop terrorists to track political activists. Congress should put an end to this unconstitutional violation of civil rights immediately.\n\nPlease overturn Section 215 of the PATRIOT Act and Section 702 of the Foreign Intelligence Surveillance Act. These legal rules have been twisted by government agencies to allow mass spying of U.S. citizens without a warrant or any suspicion of wrongdoing. The so-called USA FREEDOM Act would only make matters worse, by creating new legal loopholes for the NSA and law enforcement agencies to collect even more data on millions of Americans. I am calling on you to oppose the USA FREEDOM Act, let the PATRIOT Act expire, and end mass surveillance by the U.S. government.');
    data.append('subject', 'Ground the FBI\'s fleet of domestic spy planes.');
    data.append('org', 'fftf');
    data.append('tag', 'endsurveillance-spyplane');

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
    
    document.getElementById('phone_cta').style.display = 'none';
    document.getElementById('calling').style.display = 'block';
    show_modal('calling_modal');

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

/*
document.getElementById('tweet_paul').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(PAUL_TWEET_TEXT));
}, false);

document.getElementById('tweet_wyden').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(WYDEN_TWEET_TEXT));
}, false);
*/

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


if (window.location.href.indexOf('call=1') != -1) {
    document.getElementById('call_heading').textContent = 'Call Congress to end mass surveillance.';
    show_modal('thanks_modal');
}

if (window.location.href.indexOf('petition=1') != -1)
    show_modal('petition_modal');

if (window.location.href.indexOf('protest=1') != -1)
    window.location.href = '#protest';