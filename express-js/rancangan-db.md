### db-youtube-loundry

- users
  - name
  - address
  - phone
  - date
  - username
  - password
  - status
  - roles
  - avatar

<!-- npx sequelize-cli model:generate --name User --attributes name:string,address:string,phone:string,date:date,username:string,password:string,status:string,avatar:string -->

- units
  - code
  - name

<!-- npx sequelize-cli model:generate --name Unit --attributes code:string,name:string-->

- services
  - code
  - name
  - unit

<!-- npx sequelize-cli model:generate --name Service --attributes code:string,name:string,unit:integer-->

- customers

  - name
  - address
  - date
  - phone

<!-- npx sequelize-cli model:generate --name Customer --attributes name:string,address:string,phone:string,date:date-->

- transaction
  - code
  - date
  - total
  - customer
  - deadline
  - time
  - notes
  - users
  - status

<!-- npx sequelize-cli model:generate --name Transaction --attributes code:string,date:date,total:integer,customer:integer,deadline:date,time:string,notes:string,users:integer,status:string-->

- detail transaction
  - transaction
  - service
  - qty
  - subTotal

<!-- npx sequelize-cli model:generate --name DetailTransaction --attributes transaction:integer,service:integer,qty:integer,subTotal:integer-->
