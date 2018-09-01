# Simple Bug Reporter
A bug reporter that generates and reads report via XML file

![Preview](https://raw.githubusercontent.com/zunayedhassan/simple-bug-reporter/master/Preview.png)

## Instruction

- Create your XML file and upload to *assets/files/your_xml_file_name.xml*
- Upload images to *asstes/images/screenshots.jpg*
- Upload videos to *assets/videos/description.mp4*

## Sample XML File

```
<?xml version='1.0' encoding='UTF-8'?>
<BugReports>
    <BugReport>
        <Title value="Polyline Feature" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="Can't draw anyting" />
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_০১৫০৫৪.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="WIP" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
    <BugReport>
        <Title value="Extra White Background When Resizing Seals" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Medium" />
        <Description>
            <Data value="Create a seal" />
            <Data value="Position it at the bottom right corner of the page" />
            <Data value="Resize (big to small) with mouse from top left corner" />
            <Data value="It will show extra white background" />
        </Description>
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_০৯১৭৪৭.png" />
            <File value="assets/videos/2018-08-29 09-16-44.mp4" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Fixed" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
    <BugReport>
        <Title value="Status bar should show more status (text) on different type of seal operations" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Medium" />
        <Description>
            <Data value="Status bar should show more status (text) on different type of seal operations (like, seal moving, rotation or if anythings changes etc)" />
            <Data value="Currently it only shows for Zooming" />
        </Description>
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_০৯৩৫১৪.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Fixed" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
    <BugReport>
        <Title value="Bands image should look like as original image" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Low" />
        <Description>
            <Data value="Bands image should look like as original image" />
            <Data value="Currently it looks like pure black and white" />
        </Description>
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_০৯৪৫৩০.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
    <BugReport>
        <Title value="Smudge and Discrepency buttons should not be enabled together" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Low" />
        <Description value="Smudge and Discrepency buttons should not be enabled together" />
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_১১১০০৫.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Fixed" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult value="Either smudge enabled or discrepancy option enabled but not both" />
    </BugReport>
    <BugReport>
        <Title value="Print" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="Every features of print option should work correctly" />
        <ScreenshotsAndVideos></ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
    <BugReport>
        <Title value="On Polygon seal, at Bands option edges tab should be updated while number of corners increases" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="On Polygon seal, at Bands option edges tab should be updated while number of corners increases" />
        <ScreenshotsAndVideos>
            <File value="assets/videos/2018-08-29 11-48-07.mp4" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Fixed" />
        <StepsToReproduce>
            <Data value="Add Polygon seal" />
            <Data value="Open Bands Tab" />
            <Data value="Change number of Polygons corners from right side panes" />
            <Data value="Now look at the edge tabs on Bands tab, the number of edges are different than Polygon corners" />
        </StepsToReproduce>
        <ExpectedResult value="Number of Edge tabs and Polygon corners should be updated at the same time" />
    </BugReport>
    <BugReport>
        <Title value="Exception occured when example 2 template inserted" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Low" />
        <Description>
            <Data value="Exception occured when example 2 template inserted" />
            <Data value='&lt;pre&gt;
     [java] Exception in thread "JavaFX Application Thread" java.lang.IndexOutOfBoundsException: Index: 2, Size: 2
     [java] 	at java.util.ArrayList.rangeCheck(ArrayList.java:657)
     [java] 	at java.util.ArrayList.get(ArrayList.java:433)
     [java] 	at NewConceptTechnologies.StampSealMaker.RectangleSeal.lambda$refreshBands$8(RectangleSeal.java:712)
     [java] 	at com.sun.javafx.application.PlatformImpl.lambda$null$172(PlatformImpl.java:295)
     [java] 	at java.security.AccessController.doPrivileged(Native Method)
     [java] 	at com.sun.javafx.application.PlatformImpl.lambda$runLater$173(PlatformImpl.java:294)
     [java] 	at com.sun.glass.ui.InvokeLaterDispatcher$Future.run(InvokeLaterDispatcher.java:95)
     [java] 	at com.sun.glass.ui.gtk.GtkApplication._runLoop(Native Method)
     [java] 	at com.sun.glass.ui.gtk.GtkApplication.lambda$null$48(GtkApplication.java:139)
     [java] 	at java.lang.Thread.run(Thread.java:748)
                                &lt;/pre&gt;' />
        </Description>
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_১২১৩৪০.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce>
            <Data value="Add Polygon seal" />
            <Data value="Open Bands Tab" />
            <Data value="Change number of Polygons corners from right side panes" />
            <Data value="Now look at the edge tabs on Bands tab, the number of edges are different than Polygon corners" />
        </StepsToReproduce>
        <ExpectedResult value="There should not be any exception" />
    </BugReport>
    <BugReport>
        <Title value="Bands Foot Yield should be accurate to the seal" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description>
            <Data value="Bands Foot Yield should be accurate to the seal" />
            <Data value="But it takes half of the fonts size" />
            <Data value='&lt;pre&gt;result = line_2_radius + Sum(foot_yield) + head_yield + band_thickness + (font_size / 2.0) + foot_yield&lt;/pre&gt;' />
        </Description>
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_১২২০৫৩.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Fixed" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult value='&lt;pre&gt;result = line_2_radius + Sum(foot_yield) + head_yield + band_thickness + font_size + foot_yield&lt;/pre&gt;' />
    </BugReport>
    <BugReport>
        <Title value="Big empty space on Bands" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="Big empty space on Bands" />
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_১২৩৪১০.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce>
            <Data value="Add Circle Seal" />
            <Data value="Checks Bands tab, everything should be alright there" />
            <Data value="Now add a Rectangle seal and check the bands tab again and scroll down, you will find the big empty space there" />
        </StepsToReproduce>
        <ExpectedResult value="There should not be any unused empty space" />
    </BugReport>
    <BugReport>
        <Title value="Text in the Center's Text should always be in the center" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="Text in the Center's Text should always be in the center" />
        <ScreenshotsAndVideos>
            <File value="assets/images/Screenshot_২০১৮০৮২৯_১২৪৩৩২.png" />
        </ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult value="Text should always be in the center and keep updated as anythings changes" />
    </BugReport>
    <BugReport>
        <Title value="Page size and zoom doesn't work correctly, sometimes. Specially with SVG import" />
        <IsCollpase value="true" />
        <Platform value="Java" />
        <Severity value="Major" />
        <Description value="Page size and zoom doesn't work correctly, sometimes. Specially with SVG import" />
        <ScreenshotsAndVideos></ScreenshotsAndVideos>
        <Note></Note>
        <Status value="Reported" />
        <StepsToReproduce></StepsToReproduce>
        <ExpectedResult></ExpectedResult>
    </BugReport>
</BugReports>
```
