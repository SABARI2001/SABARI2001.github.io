<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all required fields.'
        ]);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please enter a valid email address.'
        ]);
        exit;
    }

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email body
    $emailBody = "
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subject</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br(htmlspecialchars($message)) . "</p>
        </body>
        </html>
    ";

    // Send email
    $to = "sabarinathankarruppusamy2001@gmail.com";
    $mailSent = mail($to, $subject, $emailBody, $headers);

    if ($mailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again later.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?> 