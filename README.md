# jira-clone-app
This is a clone app of jira backend


### API's

1.  /auth/signup POST  ---- api to signup
    
    body params : 
         <br>1. email
         <br>2. password
		 

2.  /auth/login POST  ---- api to login
    
    body params : 
         <br>1. email
         <br>2. password
		 
		 
3.  /project/project  POST ---- api to create project
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   <br> body params : 
         <br>1. title
		 
		 
4.  /project/ticket  POST ---- api to create ticket under a project
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   <br> body params : 
         <br>1. projectId
		 <br>2. title
		 
5.  /project/:projectId/addUser  POST ---- api to add a user to a ticket 
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. projectId
   <br> body params : 
         <br>1. userId
		 
		 
6. /project/ticket/:ticketId/update POST ---- api to update a ticket 

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. ticketId
   <br> body params : 
         <br>1. title
		 
		 
7. /project/ticket/:ticketId/assign POST ---- api to assign/reassign a ticket to a user in the project

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. ticketId
   <br> body params : 
         <br>1. userId
		 
		 
8. /project/comment POST ---- api to add a comment under a ticket

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   <br> body params : 
		 <br>1. ticketId
		 <br>2. comment
		 
9. /project/comment/:commentId POST ---- api to edit a comment

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. commentId
   <br> body params : 
		 <br>2. comment
		 
		 
		 
		 
		 
		 
		 
		 
		 
