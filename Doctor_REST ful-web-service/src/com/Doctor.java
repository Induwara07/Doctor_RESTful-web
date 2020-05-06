package com;

import java.sql.*;

public class Doctor {
	private Connection connect()
	{
		Connection con = null;
		
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test?serverTimezone=UTC", "root", "");
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return con;
	}
	
	public String insertDoctor(String regno, String name, String spec, String cont,  String add, String email, String hospital)
	{
		String output = "";
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for inserting.";
			}
			
			// create a prepared statement
			String query = " insert into doctors(`doctorID`,`doctorCode`,`doctorName`,`doctorSpec`,`doctorCont`,`doctorAdd`,`doctorEmail`,`doctorHospital`) values (?, ?, ?, ?, ?, ?, ?, ?)";
			
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, regno);
			preparedStmt.setString(3, name);
			preparedStmt.setString(4, spec);
			preparedStmt.setString(5, cont);
			preparedStmt.setString(6, add);
			preparedStmt.setString(7, email);
			preparedStmt.setString(8, hospital);
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" +newDoctors + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while inserting the doctor.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	
	public String readDoctors()
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for reading.";
			}
			
			// Prepare the html table to be displayed
			output = "<table border='1'>"
					+ "<tr><th>Doctor Code</th>"
					+ "<th>Doctor Name</th>"
					+ "<th>Doctor Specilization</th>"
					+ "<th>Contact Number</th>"
					+ "<th>Address</th>"
					+ "<th>Email</th>"
					+ "<th>Hospital</th>"
					+ "<th>Update</th>"
					+ "<th>Remove</th></tr>";
	
			String query = "select * from doctors";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			
			// iterate through the rows in the result set
			while (rs.next())
			{
				String doctorID = Integer.toString(rs.getInt("doctorID"));
				String doctorCode = rs.getString("doctorCode");
				String doctorName = rs.getString("doctorName");
				String doctorSpec = rs.getString("doctorSpec");
				String doctorCont = rs.getString("doctorCont");
				String doctorAdd = rs.getString("doctorAdd");
				String doctorEmail = rs.getString("doctorEmail");
				String doctorHospital = rs.getString("doctorHospital");
				
				// Add into the html table
				output += "<tr><td><input id='hidDoctorIDUpdate'name='hidDoctorIDUpdate' type='hidden' value='" + doctorID+ "'>" + doctorCode + "</td>";
				output += "<td>" + doctorName + "</td>";
				output += "<td>" + doctorSpec + "</td>";
				output += "<td>" + doctorCont + "</td>";
				output += "<td>" + doctorAdd + "</td>";
				output += "<td>" + doctorEmail + "</td>";
				output += "<td>" + doctorHospital + "</td>";
			
				// buttons
				output += "<td><input name='btnUpdate'type='button' "
						+ "value='Update'class='btnUpdate btn btn-secondary'></td>"
						+ "<td><input name='btnRemove'type='button' "
						+ "value='Remove'class='btnRemove btn btn-danger'data-doctorid='"+ doctorID + "'>" + "</td></tr>";
			}
			
			con.close();
			
			// Complete the html table
			output += "</table>";
			
		}
		catch (Exception e)
		{
			output = "Error while reading the doctors.";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	
	public String updateDoctor(String ID, String regno, String name, String spec, String cont, String add, String email, String hospital)
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for updating.";
			}
			
			// create a prepared statement
			String query = "UPDATE doctors SET doctorCode=?,doctorName=?,doctorSpec=?,doctorCont=?,doctorAdd=?,doctorEmail=?,doctorHospital=? WHERE doctorID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setString(1, regno);
			preparedStmt.setString(2, name);
			preparedStmt.setString(3, spec);
			preparedStmt.setString(4, cont);
			preparedStmt.setString(5, add);
			preparedStmt.setString(6, email);
			preparedStmt.setString(7, hospital);
			preparedStmt.setInt(8, Integer.parseInt(ID));
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" + newDoctors + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while updating the doctor.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	
	
	public String deleteDoctor(String doctorID)
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for deleting.";
			}
			
			// create a prepared statement
			String query = "delete from doctors where doctorID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(doctorID));
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" + newDoctors + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while deleting the doctor.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
}
