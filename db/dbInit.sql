#grant all privileges on *.* to C_Group@localhost identified by '123456';

#create a database
create database Message;

use Message;

create table User(
	userName varchar(50),
	password varchar(50) not null,
	mailbox varchar(50) not null,
	state tinyint(1) not null, #0->online 1->offline
	gender tinyint(1),	#0->female, 1->male
	birthday date,
	address varchar(50),
	phoneNumber varchar(20),
	realName varchar(50),
	registerTime date,
	primary key(userName)
);

create table List(
	listID varchar(50) not null,
	listName varchar(50) not null,
	userName varchar(50) not null,
	primary key(listID),
	foreign key(userName) references User(userName)
);

create table Friend(
	friendName1 varchar(50) not null,
	friendName2 varchar(50) not null,
	friendList1 varchar(50) not null,
	friendList2 varchar(50) not null,
	buildTime timestamp not null,
	foreign key(friendName1) references User(userName),
	foreign key(friendName2) references User(userName),
	foreign key(friendList1) references List(listID),
	foreign key(friendList2) references List(listID)
);

create table Message(
	messageFrom varchar(50),
	messageTo varchar(50),
	messageContent varchar(200),
	isSend tinyint(1) not null, #1->has been sent 1->not been sent
	sendTime timestamp not null,
	foreign key(messageFrom) references User(userName),
	foreign key(messageTo) references User(userName)
);
