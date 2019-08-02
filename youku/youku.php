<?php

$url = $_GET['url'];
$cna = $_GET['cna'];
$content = file_get_contents($url);
preg_match("#videoId2: '(.*?)',#", $content, $vid);
$vid = $vid[1];
preg_match("#showid: '(.*?)'#", $content, $showid);
$showid = $showid[1];
$ckey=base64_decode($_GET['ckey']);
//$cna = "BTQRFD9unmYCAdxy6w7T+Hfl";  
$ckey = 'DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND';

$content = get_ups_data($vid,$showid,$ckey,$cna);
$json = json_decode($content, true);
if($json['data']['e']['code'] == 0 && isset($json['data']['data']['stream'])){
      $stream = $json["data"]["data"]['stream'];
      $key = 0;
      for ($i = 0; $i < count($stream); $i++) {
                      if ($stream[$i]["height"] == 720) {
                          $key = $i;
                      }
      }
      $vurl =  urlencode($stream[$key]['m3u8_url']);
      $type = 'm3u8';
}



function get_ups_data($vid,$showid,$ckey,$cna){
	$acs = "http://acs.youku.com/h5/mtop.youku.play.ups.appinfo.get/1.1/?jsv=2.4.16&appKey=24679788";
    $response = get_headers($acs, true);
    $cookie = $response["Set-Cookie"];
    $_m_h5_tk = explode(';', $cookie[0]) [0];
    $_m_h5_tk_enc = explode(';', $cookie[1]) [0];
    $cookie = $_m_h5_tk.';'.$_m_h5_tk_enc.';P_pck_rm=x2wno9x0QFElyBrQ8P2l8tYM6YjJacKAuuDecrf0kGliLxp7u1HKeEldLvCPyO%2Bk2lR4bNPs4PNxpvYs0XT52Lk6Fipct0a1jT5LbfoHeADM7oC6P10tto%2FwpnW%2BzebwUSxfC0M1iLVlw%2FA49mCvkQ%3D%3D;';
    //$cookie = $_m_h5_tk . ';' . $_m_h5_tk_enc . ';';
    preg_match('#_m_h5_tk=(.*?);_m_h5_tk_enc#', $cookie, $token);
    $token = explode('_', $token[1]) [0];
    $api = '&api=mtop.youku.play.ups.appinfo.get&v=1.1&timeout=20000&YKPid=20160317PLF000211&YKLoginRequest=true&AntiFlood=true&AntiCreep=true&type=jsonp&dataType=jsonp&callback=mtopjsonp1';
    $client_ts = time();
    $tm = time() * 1000 + 167;
    $appKey = "24679788";
    $data = '{"steal_params":"{\"ccode\":\"0502\",\"client_ip\":\"192.168.1.1\",\"utid\":\"' . $cna . '\",\"client_ts\":' . $client_ts . ',\"version\":\"1.1.5\",\"ckey\":\"' . $ckey . '\"}","biz_params":"{\"vid\":\"' . $vid . '\",\"current_showid\":\"' . $showid . '\",\"master_m3u8\":0,\"media_type\":\"standard,subtitle\",\"app_ver\":\"0.7.0\"}","ad_params":"{\"needad\":0}"}';
    $sign = md5($token . "&" . $tm . "&" . $appKey . "&" . $data);
    $url = $acs . '&t=' . $tm . '&sign=' . $sign . '' . $api . '&data=' . urlencode($data);
    $headers = array(
            'Host:acs.youku.com',
            'Referer:http://v.youku.com/',
            'Cookie:' . $cookie,
            'User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $content = curl_exec($ch);
    echo $content;
    curl_close($ch);
    $content = substr($content, 12, -1);
    return $content;
}