CREATE DATABASE JWH;
USE JWH;

CREATE TABLE CLIENT
(
    ID          INT NOT NULL,
    Client_Name VARCHAR(255),
    Referred_by VARCHAR(255),
    PRIMARY KEY (ID)
);

CREATE TABLE COMPANY
(
    Company_Name VARCHAR(255) NOT NULL,
    PRIMARY KEY (Company_Name)
);

CREATE TABLE WAREHOUSE_LOCATION
(
    Location_Name  VARCHAR(255) NOT NULL,
    `#Of_Sections` INT,
    Owning_Company VARCHAR(255),
    PRIMARY KEY (Location_Name),
    FOREIGN KEY (Owning_Company) REFERENCES COMPANY (Company_Name) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE CONTRACT
(
    `Job#`       INT NOT NULL,
    Start_Date   DATE,
    Company_Name VARCHAR(255),
    Client_ID    INT,
    PRIMARY KEY (`Job#`),
    FOREIGN KEY (Company_Name) REFERENCES COMPANY (Company_Name) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Client_ID) REFERENCES CLIENT (ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE CONTENT
(
    Container_ID  INT NOT NULL,
    Section_ID    INT,
    Location_Name VARCHAR(255),
    Store_Date    DATE,
    Type          VARCHAR(255),
    Monthly_Cost  DECIMAL(10, 2) DEFAULT 172.00,
    Status        VARCHAR(255),
    Invoice_Code  TINYINT,
    Client_ID     INT,
    Company_Name  VARCHAR(255),
    `Job#`        INT,
    PRIMARY KEY (Container_ID),
    FOREIGN KEY (Client_ID) REFERENCES CLIENT (ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Company_Name) REFERENCES COMPANY (Company_Name) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`Job#`) REFERENCES CONTRACT (`Job#`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Location_Name, Section_ID) REFERENCES SECTION (Location_Name, Section_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE SECTION
(
    Location_Name VARCHAR(255),
    Section_ID    INT,
    Status        VARCHAR(255) DEFAULT 'Not Full',
    FOREIGN KEY (Location_Name) REFERENCES WAREHOUSE_LOCATION (Location_Name) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (Location_Name, Section_ID)
);

CREATE TABLE EMPLOYEE
(
    Employee_ID   INT NOT NULL,
    Employee_Name VARCHAR(255),
    PRIMARY KEY (Employee_ID),
    Company_Name VARCHAR(255)
);

CREATE TABLE ADMIN
(
    Username VARCHAR(255),
    Password VARCHAR(255),
    Employee_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE (Employee_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY (Username)
);

# Contract - Company
SELECT CON.`Job#`, COM.Company_Name
FROM CONTRACT AS CON
         JOIN COMPANY COM on CON.Company_Name = COM.Company_Name;

# Contract - Client
SELECT CON.`Job#`, C.ID
FROM CONTRACT AS CON
         JOIN CLIENT C on CON.Client_ID = C.ID;

# Company - Employee
SELECT COM.Company_Name, E.Employee_ID
FROM COMPANY AS COM
         JOIN EMPLOYEE E on COM.Company_Name = E.Company_Name;

# Company - Warehouse
SELECT COM.Company_Name, WL.Location_Name
FROM COMPANY AS COM
         JOIN WAREHOUSE_LOCATION WL on COM.Company_Name = WL.Owning_Company;

# Company - Contents
SELECT COM.Company_Name, C.Container_ID
FROM COMPANY AS COM
            JOIN CONTENT C on COM.Company_Name = C.Company_Name;