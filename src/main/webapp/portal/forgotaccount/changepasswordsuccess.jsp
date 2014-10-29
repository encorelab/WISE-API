<%@ include file="../include.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<link rel="shortcut icon" href="${contextPath}/<spring:theme code="favicon"/>" />
<title><spring:message code="forgotaccount.changepasswordsuccess.changePassword" /></title>

<link href="${contextPath}/<spring:theme code="globalstyles"/>" media="screen" rel="stylesheet"  type="text/css" />
<link href="${contextPath}/<spring:theme code="stylesheet"/>" media="screen" rel="stylesheet"    type="text/css" />

</head>
<body style="background:#fff;">
<div class="dialogContent">

	<div class="dialogSection">
		<div class="errorMsgNoBg"><p><spring:message code="forgotaccount.changepasswordsuccess.passwordSuccessfullyChanged" /></p></div>
	</div>
</div>
</body>
</html>