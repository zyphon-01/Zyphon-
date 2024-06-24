var firebaseConfig = {


        
    apiKey: "AIzaSyC-B73hGtX_Ym18fUGbmS0tmoOuDyXYRpw",
    authDomain: "worlox.firebaseapp.com",
    databaseURL: "https://worlox-default-rtdb.firebaseio.com",
    projectId: "worlox",
    storageBucket: "worlox.appspot.com",
    messagingSenderId: "504497586700",
    appId: "1:504497586700:web:dc3a549a243ae0a2d22429",
    measurementId: "G-FCLR5E60SP"
  };
  


  firebase.initializeApp(firebaseConfig);
  
  function getStoredName() {
          return localStorage.getItem("userName");
  }
  
  function getStoredUserId() {
          return localStorage.getItem("userId");
  }
  
  function sendMessage() {
          var message = document.getElementById("message").value;
          var userName = getStoredName();
          var userId = getStoredUserId();
  
          if (!userName) {
                  userName = prompt("Please enter your name:");
                  localStorage.setItem("userName", userName);
          }
  
          if (!userId) {
                  userId = generateUserId();
                  localStorage.setItem("userId", userId);
          }
  
          firebase.database().ref("messages").push().set({
                  "message": message,
                  "sender": userName,
                  "userId": userId
          });
  
          document.getElementById("message").value = "";
          return false;
  }
  
  function generateUserId() {
          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  function deleteMessage(self) {
          var messageId = self.getAttribute("data-id");
          var senderId = self.getAttribute("data-sender-id");
  
          var currentUserId = getStoredUserId();
          if (senderId === currentUserId) {
                  firebase.database().ref("messages").child(messageId).remove();
          } else {
                  alert("You can only delete your own messages.");
          }
  }
firebase.database().ref("messages").on("child_added", function(snapshot) {
          var messageSender = snapshot.val().sender;
          var messageSenderId = snapshot.val().userId;
          var currentUserId = getStoredUserId();
          var messageClass = messageSenderId === currentUserId ? "myMessage" : "otherMessage";
  
          var html = "<li id='message-" + snapshot.key + "' class='message " + messageClass + "'>";
          html += "<span class='sender'>" + messageSender + "</span>";
          if (messageSenderId === currentUserId) {
                  html += "<button class='bun' data-id='" + snapshot.key + "' data-sender-id='" + messageSenderId + "' onclick='deleteMessage(this);'><i class='fa-solid fa-trash'></i></button>";
          }
          html += "<p>" + snapshot.val().message + "</p>";
          html += "</li>";
  
          document.getElementById("messagesContainer").innerHTML += html;
  
          // تشغيل صوت التنبيه عند وصول رسالة جديدة
          document.getElementById("messageNotification").play();
  });
  
  firebase.database().ref("messages").on("child_removed", function(snapshot) {
          document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
  });