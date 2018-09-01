<?php
$bugId = 0;

class Platform {
    const Windows   = 0;
    const Linux     = 1;
    const Mac       = 2;
    const Web       = 3;
    const Chrome    = 4;
    const Firefox   = 5;
    const Java      = 6;
    const Android   = 7;
    const iOS       = 8;
}

class Severity {
    const Critical = 0;
    const Major    = 1;
    const Medium   = 2;
    const Low      = 3;
}

class Status {
    const Reported = 0;
    const WIP      = 1;
    const Fixed    = 2;
}

class BugReportData {
    public $title                = null;
    public $isCollapse           = null;
    public $platform             = null;
    public $severity             = null;
    public $description          = null;
    public $screenshotsAndVideos = null;
    public $note                 = null;
    public $status               = null;
    public $stepsToReproduce     = null;
    public $expectedResult       = null;
}

function bugReportStart($title, $isCollapse) {
    if ($isCollapse === true) {
        $isCollapse = "true";
    }
    else {
        $isCollapse = "false";
    }
    
    ?>
        <div class="aiom-adwaita-ui-titled-pane" data-collapse="<?php echo($isCollapse); ?>">
            <h2 class="aiom-adwaita-ui-titled-pane-title"><span><?php echo($title); ?></span></h2>

            <div class="aiom-adwaita-ui-titled-pane-contents">
                <div class="titled-pane-content-parent">
    <?php
}

function bugReportEnd() {
    ?>
                </div>
            </div>
        </div>
    <?php
}

function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

function bugReport($title, $isCollapse, $platform, $severity, $details, $preview, $note, $status, $stepsToReproduce, $expectedResult) {
    // Bug ID
    global $bugId;
    $bugId++;
    
    // Platform
    $platformIcon = null;
    $platformName = null;
    
    if ($platform == Platform::Java) {
        $platformIcon = "java.png";
        $platformName = "Java";
    }
    else if ($platform == Platform::Windows) {
        $platformIcon = "windows.png";
        $platformName = "Windows";
    }
    else if ($platform == Platform::Linux) {
        $platformIcon = "linux.svg";
        $platformName = "Linux";
    }
    else if ($platform == Platform::Mac) {
        $platformIcon = "macos.svg";
        $platformName = "Mac OS";
    }
    else if ($platform == Platform::Web) {
        $platformIcon = "web.png";
        $platformName = "Web";
    }
    else if ($platform == Platform::Chrome) {
        $platformIcon = "chrome.png";
        $platformName = "Chrome";
    }
    else if ($platform == Platform::Firefox) {
        $platformIcon = "firefox.png";
        $platformName = "Firefox";
    }
    else if ($platform == Platform::Android) {
        $platformIcon = "android.svg";
        $platformName = "Android";
    }
    else if ($platform == Platform::iOS) {
        $platformIcon = "apple.svg";
        $platformName = "iOS";
    }
    
    $platform = "<span class='platform-icon-parent'><img class='platform-icon' alt='" . $platformName . " Logo' src='assets/images/" . $platformIcon . "' /><span>" . $platformName . "</span></span>";
    
    // Severity
    $severtiyName = null;
    $severtiyClass = null;
    
    if ($severity == Severity::Critical) {
        $severtiyName = "Critical";
        $severtiyClass = "critical";
    }
    else if ($severity == Severity::Major) {
        $severtiyName = "Major";
        $severtiyClass = "major";
    }
    else if ($severity == Severity::Medium) {
        $severtiyName = "Medium";
        $severtiyClass = "medium";
    }
    else if ($severity == Severity::Low) {
        $severtiyName = "Low";
        $severtiyClass = "low";
    }
    
    $severity = "<span class='" . $severtiyClass . "'>" . $severtiyName . "</span>";
    
    // Details
    if (gettype($details) == "array") {
        $output = "<ul>";
        
        for ($i = 0; $i < count($details); $i++) {
            $output .= "<li>" . $details[$i] . "</li>";
        }
        
        $output .= "</ul>";
        
        $details = $output;
    }
    
    // Steps to Reproduce
    if ($stepsToReproduce == null) {
        $stepsToReproduce = "";
    }
    
    if (gettype($stepsToReproduce) == "array") {
        $output = "<ul>";
        
        for ($i = 0; $i < count($stepsToReproduce); $i++) {
            $output .= "<li>" . $stepsToReproduce[$i] . "</li>";
        }
        
        $output .= "</ul>";
        
        $stepsToReproduce = $output;
    }
    
    // Expected Result
    if ($expectedResult == null) {
        $expectedResult = "";
    }
    
    if (gettype($expectedResult) == "array") {
        $output = "<ul>";
        
        for ($i = 0; $i < count($expectedResult); $i++) {
            $output .= "<li>" . $expectedResult[$i] . "</li>";
        }
        
        $output .= "</ul>";
        
        $expectedResult = $output;
    }
    
    // Screenshot/Video
    $previewOutput = "";
    
    for ($i = 0; $i < count($preview); $i++) {
        $fileName = $preview[$i];
        
        if (endsWith($fileName, ".png") || endsWith($fileName, ".jpg") || endsWith($fileName, ".jpeg") || endsWith($fileName, ".bmp") || endsWith($fileName, ".gif")) {
            $previewOutput .= "<div class='zh-lightbox-parent'><a href='" . $fileName . "' data-lightbox='" . $fileName . "'><img class='zh-lightbox' src='" . $fileName . "' alt='" . $fileName . "'></a></div>";
        }
        else if (endsWith($fileName, ".mp4") || endsWith($fileName, ".ogv") || endsWith($fileName, ".webm")) {
            $previewOutput .= "<div><video class='preview' controls><source src='" . $fileName . "'></video></div>";
        }
    }

    // Status
    $statusClass = null;
    $statusName  = null;
    
    if ($status == Status::Reported) {
        $statusClass = "reported";
        $statusName  = "Reported";
    }
    else if ($status == Status::WIP) {
        $statusClass = "wip";
        $statusName  = "Work in Progress";
    }
    else if ($status == Status::Fixed) {
        $statusClass = "fixed";
        $statusName  = "Fixed";
    }
    
    $status = "<span class='" . $statusClass . "'>" . $statusName . "</span>";
        
    // Title
    $title = $status . " - " . $title;
    bugReportStart($title, $isCollapse);
    
    ?>
<table class="bug-report-table">
    <tr>
        <th>Bug ID</th>
        <td><?php echo($bugId); ?></td>
    </tr>
    
    <tr>
        <th>Current Status</th>
        <td><?php echo($status); ?></td>
    </tr>
    
    <tr>
        <th>Environment</th>
        <td><?php echo($platform); ?></td>
    </tr>
    
    <tr>
        <th>Severity</th>
        <td><?php echo($severity); ?></td>
    </tr>

    <tr>
        <th>Details</th>
        <td><?php echo($details); ?></td>
    </tr>
    
    <tr>
        <th>Expected Result</th>
        <td><?php echo($expectedResult); ?></td>
    </tr>
    
    <tr>
        <th>Steps to Reproduce</th>
        <td><?php echo($stepsToReproduce); ?></td>
    </tr>

    <tr>
        <th>Screenshot/Video</th>
        <td>
            <?php
            
            if ($previewOutput != null) {
                echo($previewOutput);
            }
            
            ?>
        </td>
    </tr>

    <tr>
        <th>Note</th>
        <td>
            <?php
            
            if ($note != null) {
                echo($note); 
            }
            
            ?>
        </td>
    </tr>
</table>    
    <?php
    
    bugReportEnd();
}

function displayBugReport($xmlFilePath) {
    $bugReports = simplexml_load_file($xmlFilePath);

    foreach ($bugReports as $bugReport) {
        $data     = new BugReportData();
        $nodeList = $bugReport->children();

        foreach ($nodeList as $node) {
            if (strtolower($node->getName()) == "title") {
                $data->title = $node["value"];
            }
            else if (strtolower($node->getName()) == "iscollpase") {
                $isCollapse = ($node["value"] == "true") ? true : false;
                $data->isCollapse = $isCollapse;
            }
            else if (strtolower($node->getName()) == "platform") {
                $platform = null;

                if (strtolower($node["value"]) == "java") {
                    $platform = Platform::Java;
                }
                else if (strtolower($node["value"]) == "windows") {
                    $platform = Platform::Windows;
                }
                else if (strtolower($node["value"]) == "linux") {
                    $platform = Platform::Linux;
                }
                else if (strtolower($node["value"]) == "mac") {
                    $platform = Platform::Mac;
                }
                else if (strtolower($node["value"]) == "web") {
                    $platform = Platform::Web;
                }
                else if (strtolower($node["value"]) == "chrome") {
                    $platform = Platform::Chrome;
                }
                else if (strtolower($node["value"]) == "firefox") {
                    $platform = Platform::Firefox;
                }
                else if (strtolower($node["value"]) == "android") {
                    $platform = Platform::Android;
                }
                else if (strtolower($node["value"]) == "ios") {
                    $platform = Platform::iOS;
                }

                $data->platform = $platform;
            }
            else if (strtolower($node->getName()) == "severity") {
                $severity = null;

                if (strtolower($node["value"]) == "critical") {
                    $severity = Severity::Critical;
                }
                else if (strtolower($node["value"]) == "major") {
                    $severity = Severity::Major;
                }
                else if (strtolower($node["value"]) == "medium") {
                    $severity = Severity::Medium;
                }
                else if (strtolower($node["value"]) == "low") {
                    $severity = Severity::Low;
                }

                $data->severity = $severity;
            }
            else if (strtolower($node->getName()) == "description") {
                if (count($node->children()) > 0) {
                    $description = array();

                    foreach ($node->children() as $list) {
                        if (strtolower($list->getName()) == "data") {
                            array_push($description, $list["value"]);
                        }
                    }

                    $data->description = $description;
                }
                else {
                    $data->description = $node["value"];
                }
            }
            else if (strtolower($node->getName()) == "screenshotsandvideos") {
                $screenshotsAndVideos = array();

                foreach ($node->children() as $file) {
                    array_push($screenshotsAndVideos, $file["value"]);
                }

                $data->screenshotsAndVideos = $screenshotsAndVideos;
            }
            else if (strtolower($node->getName()) == "note") {
                $data->note = strip_tags($node->asXML());
            }
            else if (strtolower($node->getName()) == "status") {
                $status = null;

                if (strtolower($node["value"]) == "reported") {
                    $status = Status::Reported;
                }
                else if (strtolower($node["value"]) == "wip") {
                    $status = Status::WIP;
                }
                else if (strtolower($node["value"]) == "fixed") {
                    $status = Status::Fixed;
                }

                $data->status = $status;
            }
            else if (strtolower($node->getName()) == "stepstoreproduce") {
                if (count($node->children()) > 0) {
                    $stepsToReproduce = array();

                    foreach ($node->children() as $list) {
                        if (strtolower($list->getName()) == "data") {
                            array_push($stepsToReproduce, $list["value"]);
                        }
                    }

                    $data->stepsToReproduce = $stepsToReproduce;
                }
                else {
                    $data->stepsToReproduce = $node["value"];
                }
            }
            else if (strtolower($node->getName()) == "expectedresult") {
                if (count($node->children()) > 0) {
                    $expectedResult = array();

                    foreach ($node->children() as $list) {
                        if (strtolower($list->getName()) == "data") {
                            array_push($expectedResult, $list["value"]);
                        }
                    }

                    $data->expectedResult = $expectedResult;
                }
                else {
                    $data->expectedResult = $node["value"];
                }
            }
        }
        
        bugReport(
                $data->title,
                $data->isCollapse,
                $data->platform,
                $data->severity,
                $data->description,
                $data->screenshotsAndVideos,
                $data->note,
                $data->status,
                $data->stepsToReproduce,
                $data->expectedResult
        );
    }
}

function getListOfBugReports() {
    $listOfFiles = scandir("assets/files");
    $output = array();

    foreach ($listOfFiles as $fileName) {
        if (endsWith($fileName, ".xml")) {
            array_push($output, $fileName);
        }
    }

    return $output;
}

function displayListOfBugReports() {
    ?>
    <ul>
        <?php
            $list = getListOfBugReports();

            foreach ($list as $fileName) {
                $title = explode(".xml", $fileName)[0];
                ?><li><a href="details.php?view=<?php echo($fileName); ?>"><?php echo($title); ?></a></li><?php 
            }

        ?>
    </ul>    
    <?php
}