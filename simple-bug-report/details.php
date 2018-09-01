<?php
session_start();
require_once './bug-report-utilities.php';

$fileName = null;
$pageTitle = "Bug Report: ";

if (isset($_GET["view"])) {
    $pageTitle .= explode(".xml", $_GET["view"])[0];
    $fileName = "assets/files/" . trim($_GET["view"]);
}

if ($fileName == null) {
    header('Location: index.php');
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title><?php echo($pageTitle); ?></title>
        
        <!-- jQuery -->
        <script type="text/javascript" src="assets/lib/jquery-3.2.1.min.js"></script>
        
        <!-- Lightbox -->
        <link rel="stylesheet" type="text/css" href="assets/lib/lightbox2/css/lightbox.min.css" />
        <script type="text/javascript" src="assets/lib/lightbox2/js/lightbox.min.js"></script>
        
        <!-- Adwaita UI -->
        <link type="text/css" rel="stylesheet" href="assets/lib/adwaita-ui/adwaita-web-ui.css" />
        <script type="text/javascript" src="assets/lib/adwaita-ui/adwaita-web-ui.js"></script>
        
        <link type="text/css" rel="stylesheet" href="assets/css/style.css" />
    </head>
    <body>
        <main class="aiom-adwaita-ui-pane">
            <header id="main-header">
                <h1><?php echo($pageTitle); ?></h1>
            </header>
            
            <section id="bugs">
                <div class="aiom-adwaita-ui-accordion">
                    <?php displayBugReport($fileName); ?>
                </div>
            </section>
        </main>
        
        <script type="text/javascript" src="assets/js/script.js"></script>
    </body>
</html>
