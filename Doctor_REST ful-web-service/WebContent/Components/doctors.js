$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	
	$("#doctorCont").focusout(function() {
		checkContact();
	});
	
	$("#doctorEmail").focusout(function() {
		checkEmail();
	});
	
	$("#alertError").hide();
});


//variables 
let vContactno = true;
let vEmail = true;

//SAVE 
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateDoctorForm();
	
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid
	var method = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "DoctorsAPI",
		type : method,
		data : $("#formDoctor").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onDoctorSaveComplete(response.responseText, status);
		}
	});
});

//UPDATE
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidDoctorIDSave").val($(this).closest("tr").find('#hidDoctorIDUpdate').val());
	$("#doctorCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#doctorName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#doctorSpec").val($(this).closest("tr").find('td:eq(2)').text());
	$("#doctorCont").val($(this).closest("tr").find('td:eq(3)').text());
	$("#doctorAdd").val($(this).closest("tr").find('td:eq(4)').text());
	$("#doctorEmail").val($(this).closest("tr").find('td:eq(4)').text());
	$("#doctorHospital").val($(this).closest("tr").find('td:eq(5)').text());
});

function onDoctorSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidDoctorIDSave").val("");
	$("#formDoctor")[0].reset();
}

$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "DoctorsAPI",
		type : "DELETE",
		data : "doctorID=" + $(this).data("doctorid"),
		dataType : "text",
		complete : function(response, status)
		{
			onDoctorDeleteComplete(response.responseText, status);
		}
	});
});

function onDoctorDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}




// email validation
function checkEmail() {
	let email = $("#doctorEmail").val().trim();
	let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (regex.test(email)) {
		$("#email_error").hide();
		return true;
	} else {
		$("#email_error").html("Enter valid email");
		$("#email_error").show();
		return false;
	}
}


function validateDoctorForm()
{
	// Doctor RegNo.
	if ($("#doctorCode").val().trim() == "")
	{
		return "Please Insert Doctor RegNo:.";
	}
	
	// Doctor Name
	if ($("#doctorName").val().trim() == "")
	{
		return "Please Insert Doctor Name.";
	}
	
	//Doctor Specialization
	if ($("#doctorSpec").val().trim() == "")
	{
		return "Please Insert Doctor Specialization.";
	}
	
	// Contact No validation
	var tmpPrice = $("#doctorCont").val().trim();
	
	if (!$.isNumeric(tmpPrice))
	{
		return "Please Insert Valid Contact No.";
	}
	
	//Doctor Address
	if ($("#doctorAdd").val().trim() == "")
	{
		return "Please Insert Address.";
	}
	
	//Doctor Email
	if ($("#doctorEmail").val().trim() == "")
	{
		return "Please Insert Email.";
	}

	
	// Hospital
	if ($("#doctorHospital").val().trim() == "")
	{
		return "Please Insert Hospital.";
	}
	
	return true;
}

function checkContact() {
	var contact = $("#doctorCont").val().length;
	
	if(contact == 10) {
		$("#error_contact").hide();
	} else {
		$("#error_contact").html("This field is required");
		$("#error_contact").show();
	}
}

//email validation
function checkEmail() {
	let email = $("#doctorEmail").val().trim();
	let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (regex.test(email)) {
		$("#error_email").hide();
	} else {
		$("#error_email").html("Enter valid email");
		$("#error_email").show();
	}
}