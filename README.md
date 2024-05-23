# IIT Delhi Attendance System
This repository contains the source code for the IIT Delhi Attendance System, developed as an in-house project to address the shortcomings of the existing outsourced system, "TIMBLE". The project comprises a mobile application, a web portal, a backend server, and a database to ensure secure and efficient attendance tracking for students and faculty.


## Overview
The IIT Delhi Attendance System aims to create a reliable, secure, and user-friendly attendance tracking system by addressing the following gaps in the previous system (TIMBLE):

## Proximity Issues: Ensuring attendance marking within the lecture hall.
Multiple Logins: Preventing multiple logins from the same or different devices.
Data Control: Providing the institution with complete control over attendance data.
System Architecture
The system consists of:

## Mobile Applications (Flutter): Unified codebase for Android and iOS, utilizing flutter_udid for unique device identification.
Web Portal (React): User-friendly interface for accessing attendance-related information, communicating with the backend through API calls.
Django Backend: Core logic and functionality, managing user authentication, data retrieval, and updates.
PostgreSQL Database: Data persistence for user details, attendance records, and device mappings.

# Features
## Mobile App
Device Registration: One-time device registration through QR code scanning.
Attendance Marking: QR code scanning during class to mark attendance.
View Attendance: Students can view their attendance records for each course.
Web Portal
QR Code Display: Professors display QR codes in class for students to scan.
Attendance Management: Professors start and stop attendance marking through the portal.
Backend
RESTful APIs: Communication between front end and server using secure API endpoints.
Data Processing: Validates and processes attendance data, ensuring security through encryption and JWT tokens.
Database Schema
Course: Stores course information and links to semesters and instructors.
Semester: Tracks academic years and semesters.
Attendance Records: Stores unique attendance entries for each student and course.
User Profiles: Manages student information and device IDs.
Security Measures
JWT Tokens: Secure session management.
UDID: Unique device identification to prevent multiple logins.
HTTPS: Ensures encrypted communication between clients and server.
Future Work
Alpha Testing: Gather feedback and refine the user experience.
Scalability Testing: Ensure performance with increased users and data.
Staff-Side Portal: Facilitate administrative processes for course registration data.
Steganography: Prevent QR code sharing by embedding hidden data in visible QR codes.

Contact
For any queries or issues, please contact:

Divyansh Singh: ssdivyansh9140@gmail.com
