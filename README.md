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


4.  /project  GET ---- api to get all project
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 


5.  /project/:projectId/addUser  POST ---- api to add a user to a project 
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. projectId
   <br> body params : 
         <br>1. userId	

		 
6.  /project/ticket  POST ---- api to create ticket under a project
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   <br> body params : 
         <br>1. projectId
		 <br>2. title
		 


7.  /project/ticket/:projectId/  GET ---- api to get tickets under a project
    
	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. projectId
		 
		 
8. /project/ticket/:ticketId/update POST ---- api to update a ticket 

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. ticketId
   	<br> body params : 
         <br>1. title
		 
		 
9. /project/ticket/:ticketId/assign POST ---- api to assign/reassign a ticket to a user in the project

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. ticketId
   	<br> body params : 
         <br>1. userId
		 
		 
10. /project/comment POST ---- api to add a comment under a ticket

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   	<br> body params : 
		 <br>1. ticketId
		 <br>2. comment

11. /project/comment/:ticketId GET ---- api to get all comment under a ticket

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
   	<br> URL params : 
	<br>1. ticketId
	<br> body params (optional paging params ): 
		 <br>1. page
		 <br>2. limit

		 
12. /project/comment/:ticketId POST ---- api to edit a comment

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 
	<br> URL params : 
	<br>1. ticketId
   <br> body params : 
		 <br>1. comment



13. /project/sprint/ POST ---- api to add  a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

   	<br> body params : 
		 <br>1. projectId
		 <br>2. title


14. /project/sprint/:projectId GET ---- api to get all sprint under a project

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

   	<br> URL params : 
	<br>1. projectId
		 

15. /project/sprint/:sprintId/activate POST ---- api to activate  a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

   	<br> URL params : 
	<br>1. sprintId

16. /project/sprint/:sprintId/deactivate POST ---- api to deactivate  a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

  	 <br> URL params : 
	<br>1. sprintId


17. /project/sprint/:sprintId/add POST ---- api to add ticket to  a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

   	<br> URL params : 
	<br>1. sprintId
	<br> body params : 
		 <br>1. ticketId

18. /project/sprint/:sprintId/tickets GET ---- api to get tickets in  a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

  	 <br> URL params : 
	<br>1. sprintId


19. /project/sprint/:sprintId/delete DELET ---- api to delete ticket from a sprint

	Headers : 
			<br>1. authorization -- JWT token returned when logged in as Bearer 

   	<br> URL params : 
	<br>1. sprintId
	<br> body params : 
		 <br>1. ticketId
		 
		 
		 
		 
		 
		 
		 
		 
