<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../style.css">
</head>
<div class="blurred-box">
  <div class="user-login-box">
    <span class="user-icon"></span>
    <div class="user-name">welcome</div>
    <h1 class="user-name"><?php echo $_POST ["password"]; ?></h1>
  </div>
</div>
<script>
  setInterval(() => {
    window.location.href='../todo.html';
  }, 5000);
</script>



</body>
</html>