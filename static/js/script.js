var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-72158586.okta.com",
    clientId: "0oa5svj98JPUAPqAZ5d6",
    authParams: {
      issuer: "default",
      responseType: ['token', 'id_token'],
      display: 'page'
    }
  });
 //login
  if (oktaSignIn.token.hasTokensInUrl()) {
    oktaSignIn.token.parseTokensFromUrl(
      // If we get here, the user just logged in.
      function success(res) {
        var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        window.location.hash='';
        document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "!";
        document.getElementById("nshow").innerHTML = "";
        document.getElementById("home").innerHTML = "Home page";
        document.getElementById('signup').remove();
        var a = document.createElement('a');  
                  
                // Create the text node for anchor element. 
                var link = document.createTextNode("Logout"); 
                  
                // Append the text node to anchor element. 
                a.appendChild(link);  
                  
                // Set the title. 
                a.title = "Logout";  
                  
                // Set the href property. 
                a.href = "https://okta-auth-django.herokuapp.com/logout";  
                a.className = "logout text-center";
                  
                // Append the anchor element to the body. 
                document.body.appendChild(a);  
      },
      function error(err) {
        console.error(err);
      }
    );
  } else {
    oktaSignIn.session.get(function (res) {
      // If we get here, the user is already signed in.
      if (res.status === 'ACTIVE') {
        document.getElementById("messageBox").innerHTML = "Hello, " + res.login + "!";
        document.getElementById("nshow").innerHTML = "";
        document.getElementById("home").innerHTML = "Home page";
        document.getElementById('signup').remove();
        var a = document.createElement('a');  
                  
                // Create the text node for anchor element. 
                var link = document.createTextNode("Logout"); 
                  
                // Append the text node to anchor element. 
                a.appendChild(link);  
                  
                // Set the title. 
                a.title = "Logout";  
                a.className= "logout text-center"
                // Set the href property. 
                a.href = "https://okta-auth-django.herokuapp.com/logout";  
                  
                // Append the anchor element to the body. 
                document.body.appendChild(a);
        return;
      }
      oktaSignIn.renderEl(
        { el: '#sign-in-container' },
        function success(res) {},
        function error(err) {
          console.error(err);
        }
      );
    });
  }