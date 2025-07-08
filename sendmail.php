<?php
mb_language("ja");
mb_internal_encoding("UTF-8");

// POST受け取り
$name = trim($_POST['your-name'] ?? '');
$kana = trim($_POST['your-kana'] ?? '');
$phone = trim($_POST['your-num'] ?? '');
$email = trim($_POST['your-mail'] ?? '');
$date = trim($_POST['your-date'] ?? '');
$time = trim($_POST['your-time'] ?? '');
$accept = $_POST['acceptForm'] ?? '';

if (!$name || !$kana || !$phone || !$email || !$date || !$time || !$accept) {
  echo json_encode(['status' => 'error', 'message' => '必須項目が不足しています']);
  exit;
}

// メール設定
$to_admin = 't.murakami@jlr-shizuoka.jp';
$from_email = 't.murakami@jlr-shizuoka.jp';
$cc_list = ['t.murakami@jlr-shizuoka.jp','yawata.car.3@gmail.com', 'yawata.car.217@gmail.com'];
$cc_string = implode(',', $cc_list);

// 本文共通
$body_common = <<<EOM
【お名前】{$name} 様
【ふりがな】{$kana} 様
【電話番号】{$phone}
【メールアドレス】{$email}
【来場日時】{$date} {$time}

EOM;

// 管理者向け
$subject_admin = '来場予約のお知らせ';
$body_admin = "来場予約が入りましたのでお知らせいたします。\n予約内容は以下のとおりです。\n\n{$body_common}";

$headers_admin = [];
$headers_admin[] = 'MIME-Version: 1.0';
$headers_admin[] = 'Content-Type: text/plain; charset=UTF-8';
$headers_admin[] = 'Content-Transfer-Encoding: 8bit';
$headers_admin[] = 'From: ' . mb_encode_mimeheader('ランドローバーイベント事務局') . " <{$from_email}>";
$headers_admin[] = "Reply-To: {$email}";
if (!empty($cc_list)) {
  $headers_admin[] = "Cc: {$cc_string}";
}
$headers_admin_str = implode("\r\n", $headers_admin);

// ユーザー向け
$subject_user = 'ご来場予約ありがとうございます';
$body_user = <<<EOM
{$name} 様

このたびは、ランドローバーアドベンチャーイベントへのご来場予約をいただき、誠にありがとうございます。
ご予約内容は以下のとおりです。

{$body_common}

ご入力いただきました内容を確認のうえ、担当より改めてご連絡させていただきます。

当日はスタッフ一同、心よりお待ち申し上げております。
何かご不明な点やご変更等ございましたら、お気軽にご連絡くださいませ。
今後ともどうぞよろしくお願いいたします。
敬具
EOM;

$headers_user = [];
$headers_user[] = 'MIME-Version: 1.0';
$headers_user[] = 'Content-Type: text/plain; charset=UTF-8';
$headers_user[] = 'Content-Transfer-Encoding: 8bit';
$headers_user[] = 'From: ' . mb_encode_mimeheader('ランドローバーイベント事務局') . " <{$from_email}>";
$headers_user[] = "Reply-To: {$from_email}";
$headers_user_str = implode("\r\n", $headers_user);

// 送信
$send_admin = mb_send_mail($to_admin, $subject_admin, $body_admin, $headers_admin_str);
$send_user = mb_send_mail($email, $subject_user, $body_user, $headers_user_str);

// ログ出力
$log = date('Y-m-d H:i:s') . " 管理者送信: " . ($send_admin ? "成功" : "失敗") . " / ユーザー送信: " . ($send_user ? "成功" : "失敗") . " / 電話番号: {$phone} / メール: {$email}\n";
file_put_contents('mail_log.txt', $log, FILE_APPEND | LOCK_EX);

// フロントに通知
if ($send_admin && $send_user) {
  echo json_encode(['status' => 'success', 'message' => '送信が完了しました']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'メール送信に失敗しました']);
}
