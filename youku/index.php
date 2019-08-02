<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv=X-UA-Compatible content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<title></title>
<link rel="shortcut icon" href="favicon.ico">
<style>

</style>
</head>
<script src="https://cdn.staticfile.org/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/prince3661/age23@1.1.2/ck.js"></script>
<script src="https://log.mmstat.com/eg.js"></script>

<body>
</body>
<script type="text/javascript">
  var url =  '<?=htmlspecialchars($_GET['url']);?>';
  cna='eQu/FQ5b0yACAXHntIpX5d7h';
  $.ajax({
    url: 'youku.php?url=' + url + '&cna=' + window.goldlog.Etag + '&ckey='+ckey,
    dataType: 'jsonp',
    success: function(json) {
     
    }
  })
</script>
