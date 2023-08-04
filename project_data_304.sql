CREATE TABLE Location_1(
	PostalCode CHAR(6) PRIMARY KEY,
	City varchar(20),
	Province varchar(50)
);

insert into Location_1
values('A5B3C7', 'Richmond Knoll', 'Allofit');
insert into Location_1
values('B2D3S6', 'Eastminster', 'Twotario');
insert into Location_1
values('S2B5D3', 'Boronto', 'French Columbia');
insert into Location_1
values('B3G6S2', 'Vanscooter', 'Princess Edwardo Land');
insert into Location_1
values('B2S5D3', 'Canada', 'Oldfoundland');



CREATE TABLE Location_2(
	PostalCode CHAR(6),
	Street varchar(50),
	UnitNumber INTEGER,
	PRIMARY KEY (PostalCode, Street, UnitNumber)
);

insert into Location_2
values('A5B3C7', 'Second St', '2');
insert into Location_2
values('B2D3S6', 'Dinger Rd', '2633');
insert into Location_2
values('S2B5D3', 'Schule St', '562');
insert into Location_2
values('B3G6S2', 'West St E', '69');
insert into Location_2
values('B2S5D3', 'Lane Rd', '555');




CREATE TABLE PrivateLister (
	ID INTEGER PRIMARY KEY,
	Name CHAR(30)
);

insert into PrivateLister
	values('1', 'Vicki');
insert into PrivateLister
	values('2', 'Ayush');
insert into PrivateLister
	values('3', 'Jeffrey');
insert into PrivateLister
	values('4', 'Frank');
insert into PrivateLister
	values('5', 'Sam');




CREATE TABLE HotelOrganization(
	ID INTEGER PRIMARY KEY,
	Name CHAR(30) UNIQUE
);

insert into HotelOrganization
	values('1', 'Fairmont Hotel');
insert into HotelOrganization
	values('2', 'Hyatt Regency');
insert into HotelOrganization
	values('3', 'Sandman Hotel');
insert into HotelOrganization
	values('4', 'Mariott');
insert into HotelOrganization
	values('5', 'Rosewood');



CREATE TABLE Customer (
	ID INTEGER PRIMARY KEY,
	Name CHAR(30)
);


insert into Customer
	values('1', 'Fairmont Hotel');
insert into Customer
	values('2', 'Hyatt Regency');
insert into Customer
	values('3', 'Sandman Hotel');
insert into Customer
	values('4', 'Mariott');
insert into Customer
	values('5', 'Rosewood');



CREATE TABLE MakesReservation_2(
	StartDate DATE,
	Duration INTEGER,
	EndDate DATE,
	PRIMARY KEY (StartDate, Duration)
);



insert into MakesReservation_2
	values('2023-02-13', '7', '2023-02-20');
insert into MakesReservation_2
	values('2023-06-18', '2', '2023-06-20');
insert into MakesReservation_2
	values('2023-12-23', '4', '2023-12-27');
insert into MakesReservation_2
	values('2023-09-08', '10', '2023-09-18');
insert into MakesReservation_2
	values('2023-02-23', '5', '2023-02-28');


CREATE TABLE MakesReservation_1(
	reservation_ID INTEGER PRIMARY KEY,
	CustomerID INTEGER NOT NULL,
	StartDate DATE,
	Duration INTEGER,
	FOREIGN KEY (CustomerId) REFERENCES Customer (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (StartDate, Duration) REFERENCES MakesReservation_2 (StartDate, Duration)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

insert into MakesReservation_1
	values('1', '2', '2023-02-13', '7');
insert into MakesReservation_1
	values('2', '3', '2023-06-18', '2');
insert into MakesReservation_1
	values('3', '5', '2023-12-23', '4');
insert into MakesReservation_1
	values('4', '4', '2023-09-08', '10');
insert into MakesReservation_1
	values('5', '2', '2023-02-23', '5');




CREATE TABLE Membership_1(
	HotelOrganization_ID INTEGER PRIMARY KEY,
	DiscountRate INTEGER
);

insert into Membership_1
	values('1', '20');
insert into Membership_1
	values('2', '45');
insert into Membership_1
	values('3', '12');
insert into Membership_1
	values('4', '15');
insert into Membership_1
	values('5', '15');


CREATE TABLE Membership_2(
	HotelOrganization_ID INTEGER,
	CustomerID INTEGER,
	PRIMARY KEY (HotelOrganization_ID, CustomerID),
	FOREIGN KEY (HotelOrganization_ID) REFERENCES Membership_1 (HotelOrganization_ID),
	FOREIGN KEY (CustomerID) REFERENCES Customer (ID)
);

insert into Membership_2
	values('1', '2');
insert into Membership_2
	values('2', '2');
insert into Membership_2
	values('3', '4');
insert into Membership_2
	values('4', '3');
insert into Membership_2
	values('5', '1');

CREATE TABLE  RentableUnit(
	RentableUnit_ID INTEGER PRIMARY KEY,
	NumPeople INTEGER,
	NumBeds INTEGER,
	Customer_ID INTEGER,
	PrivateOrganization_ID INTEGER NOT NULL,
	FOREIGN KEY (PrivateOrganization_ID) REFERENCES PrivateLister (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (Customer_ID) REFERENCES Customer (ID)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

insert into RentableUnit
	values('1', '6', '3', '2', '1');
insert into RentableUnit
	values('2', '3', '2', '3', '2');
insert into RentableUnit
	values('3', '1', '1', '1', '3');
insert into RentableUnit
	values('4', '3', '2', '5', '4');
insert into RentableUnit
	values('5', '3', '2', '4', '5');



CREATE TABLE  PrivateListing(
	PrivateListing_ID INTEGER PRIMARY KEY,
	Cost INTEGER,
	Description varchar(200),
	RentableUnit_ID INTEGER NOT NULL,
	FOREIGN KEY (RentableUnit_ID) REFERENCES RentableUnit (RentableUnit_ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

insert into PrivateListing
	values('1', '600', 'small house, 3 bedrooms, kitchen', '1');
insert into PrivateListing
	values('2', '100', 'singular room with shared bathroom', '2');
insert into PrivateListing
	values('3', '200', 'singular room with private bathroom', '3');
insert into PrivateListing
	values('4', '300', 'small apartment, 2 bedroom 1 bathroom', '4');
insert into PrivateListing
	values('5', '200', 'treehouse', '5');




CREATE TABLE Property(
	Property_ID INTEGER PRIMARY KEY,
	HotelOrganization_ID INTEGER NOT NULL,
	Name varchar(30),
	NumRooms INTEGER,
	FOREIGN KEY (HotelOrganization_ID) REFERENCES HotelOrganization (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

insert into Property
	values('1', '1', 'Fairmont Vancouver', '100');
insert into Property
	values('2', '1', 'Fairmont Whistler', '200');
insert into Property
	values('3', '3', 'Hyatt Vancouver', '150');
insert into Property
	values('4', '4', 'Mariott Vancouver', '100');
insert into Property
	values('5', '5', 'Rosewood Burnaby', '50');




CREATE TABLE Amenities (
	Amenities_ID INTEGER PRIMARY KEY,
	Type varchar(30),
	Description varchar(200),
	RentableUnit_ID INTEGER,
	Property_ID INTEGER,
	FOREIGN KEY (RentableUnit_ID) REFERENCES RentableUnit (RentableUnit_ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (Property_ID) REFERENCES Property (Property_ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

insert into Amenities
	values('1', 'Pool', '20 sq foot pool in lobby', '1', NULL);
insert into Amenities
	values('2', 'Lounge', 'Amazing lounge in the lobby of our building', Null, '2');
insert into Amenities
	values('3', 'Cafeteria', 'Free breakfast', Null, '3');
insert into Amenities
	values('4', 'Pool', 'Outdoor large pool', '3', Null);
insert into Amenities
	values('5', 'Theater', 'In house movie theater', '1', Null);






CREATE TABLE  BookableUnit(
	Property_ID INTEGER,
	RoomNum INTEGER,
	NumPeople INTEGER,
	NumBeds INTEGER,
	CustomerID INTEGER,
	PRIMARY KEY (Property_ID, RoomNum),
	FOREIGN KEY (CustomerID) REFERENCES Customer (ID)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

insert into BookableUnit
	values('1', '142', '1', '1', Null);
insert into BookableUnit
	values('2', '364', '2', '2', '2');
insert into BookableUnit
	values('3', '2000', '5', '2', Null);
insert into BookableUnit
	values('4', '234', '2', '1', Null);
insert into BookableUnit
	values('5', '446', '2', '1', Null);






CREATE TABLE  HotelListing(
	HotelListing_ID INTEGER PRIMARY KEY,
	Cost INTEGER,
	Description varchar(100),
	Property_ID INTEGER NOT NULL,
	RoomNumber INTEGER NOT NULL,
	FOREIGN KEY (Property_ID, RoomNumber) REFERENCES BookableUnit (Property_ID, RoomNum)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

insert into HotelListing
values('1', '200', 'Twin bed', '1', '142');

insert into HotelListing
values('2', '250', 'Two twin', '2', '364');

insert into HotelListing
values('3', '1000', '2x king bed + jacuzzi + balcony', '3', '2000');

insert into HotelListing
values('4' ,'300', 'water bed 2 bedroom 1 bathroom', '4', '234');

insert into HotelListing
values('5', '200', 'bunk bed and canoe', '5', '446');  




















