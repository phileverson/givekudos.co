// Initial Important API Stuff From Facebook
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$('#giveKudosTrigger').click(function(){
    initFBAuthAndFormTrigger();
    $('.giveKudosTriggerContainer').css('display', 'none');
})


// Check if user is in the passed group
function userInGroup(groupMembers, userID) {
    for (var i = 0; i < groupMembers.length; i++) {
      if (userID == groupMembers[i]) {
        return true;
      }
   }
   return false;
}

// Facebook user ID's of members of IIE CPT group
var IIE_CPT_MEMBERS = [
    '10205710572015966', 
    '10153671009794274', 
    '10206490132844716', 
    '1632767506979561', 
    '933569536689109', 
    '10203803064591689', 
    '10204822017021557', 
    '10153421545195999', 
    '10153665838907780',
    '10152924211545938', 
    '10153173370563940',
    '10153011469226109',
    '10154097300995110',
    '10153036248230423', 
    '10152984915300614',
    '10155851241660537',
    '10153445028545973',
    '10152759677206431',
    '10153179233426359'
    ];

function initFBAuthAndFormTrigger () {
  // start of fb auth and fb commands...
  // window.fbAsyncInit = function() {
    FB.init({
      appId      : '477029115777864',
      xfbml      : true,
      version    : 'v2.4'
    });
    
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
        
      }
      else {
        // FB.login();
      }
    });

    FB.login(function(response) {
     // console.log(response.authResponse.userID);

     var kudosGiverUserID = response.authResponse.userID;
     console.log(kudosGiverUserID);

     if (userInGroup(IIE_CPT_MEMBERS, kudosGiverUserID)) {

        // **********************************************
        // **********    READ ME!!!    ******************
        // **********************************************
        // @todo: Code here to put the form on the page
        // Really, could be as simple as removing a .hide / display none...

        // Note: Above, implemented

        $('.giveKudosSubmitForm').css('display', 'block');

     }

     // ********** CODE NEEDED TO GET STRING OF GROUP MEMEBERS FROM GROUP YOU'RE AN ADMIN OF... ********** 
     // for (var i = 0; i < kudosbotGroups.length; i++) {
       
     // var stringOfIDs = '';
     // FB.api(
     //  "/" + kudosbotGroups[i] + "/members?limit=10000",
     //  function (response) {
     //    if (response && !response.error) {
     //      for (var i = 0; i < response.data.length; i++) {
     //        stringOfIDs = stringOfIDs + response.data[i].id + ', ';
     //        // console.log(response.data[i].id);
     //      };
     //      console.log(stringOfIDs);
     //    }
     //    else {
     //      console.log(response);
     //    }
     //  }
     //  );
     // };

   }, {
     scope: '', 
   });

  }; // closing of fbAsyncInit

// } // closing of initFBAuthAndFormTrigger




// Hacky JS from old method...

var fbKudosFireB = new Firebase("https://fb-kudos.firebaseio.com/");


// //testing getting the last one...

// var ref = new Firebase("https://fb-kudos.firebaseio.com/");
// ref.limitToLast(1).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });







//actual submit

    $('#form-submit').on('click',function(){
        var inputTO = $('#to').val();
        var inputFROM = $('#from').val();
        var inputMESSAGE = $('#message').val();
        var inputBADGE = $('#badge').val();

        var newKudosEntry = fbKudosFireB.push({
          recipient: inputTO,
          sender: inputFROM,
          badge: inputBADGE,
          message: inputMESSAGE
        });

        // var d = new Date();

        // var dateThatIsPK = new Date();


        // var toID = "entry.833095483";
        // var fromID = "entry.309066589";
        // var messageID = "entry.1723462075";
        // var badgeID = "entry.1733248513";
        // // https://docs.google.com/forms/d/1CShs1Niqw6KldfTPHMt_BXvZD-l3eEGIQ0PxMRkcZeg/viewform?entry.833095483=phil&entry.309066589=rebecca&entry.1723462075=message&entry.1733248513=General+Awesomeness
        // var baseURL = 'https://docs.google.com/forms/d/1CShs1Niqw6KldfTPHMt_BXvZD-l3eEGIQ0PxMRkcZeg/formResponse?';
        // var submitRef = '&submit=Submit';
        // var submitURL = (baseURL + toID + "=" + inputTO + "&" + fromID + "=" + inputFROM + "&" + messageID + "=" + inputMESSAGE + "&" + badgeID + "=" + inputBADGE + submitRef);
        // console.log(moment().format("x"));
        // $(this)[0].action=awsSubmitURL;

        $('#successmsg').css('display','block');
    });