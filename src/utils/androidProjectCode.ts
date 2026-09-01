export interface AndroidCodeFile {
  filename: string;
  path: string;
  language: 'kotlin' | 'xml' | 'groovy';
  description: string;
  code: string;
}

export const ANDROID_PROJECT_FILES: AndroidCodeFile[] = [
  {
    filename: 'MainActivity.kt',
    path: 'app/src/main/java/com/baker/digitalcv/MainActivity.kt',
    language: 'kotlin',
    description: 'Main Activity hosting Compose Navigation, Splash Screen, Material 3 Theme, and Bottom Bar.',
    code: `package com.baker.digitalcv

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.baker.digitalcv.data.CvRepository
import com.baker.digitalcv.ui.navigation.AppNavGraph
import com.baker.digitalcv.ui.navigation.BottomNavigationBar
import com.baker.digitalcv.ui.screens.SplashScreen
import com.baker.digitalcv.ui.theme.BakerDigitalCvTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            var isDarkMode by remember { mutableStateOf(false) }
            
            BakerDigitalCvTheme(darkTheme = isDarkMode) {
                MainAppContent(
                    onToggleTheme = { isDarkMode = !isDarkMode },
                    isDarkMode = isDarkMode
                )
            }
        }
    }
}

@Composable
fun MainAppContent(
    onToggleTheme: () -> Unit,
    isDarkMode: Boolean
) {
    var showSplash by remember { mutableStateOf(true) }
    val navController = rememberNavController()
    val cvData = remember { CvRepository.getCvData() }

    if (showSplash) {
        SplashScreen(onAnimationFinish = { showSplash = false })
    } else {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            bottomBar = {
                BottomNavigationBar(navController = navController)
            }
        ) { innerPadding ->
            AppNavGraph(
                navController = navController,
                cvData = cvData,
                isDarkMode = isDarkMode,
                onToggleTheme = onToggleTheme,
                modifier = Modifier.padding(innerPadding)
            )
        }
    }
}`
  },
  {
    filename: 'CvData.kt',
    path: 'app/src/main/java/com/baker/digitalcv/data/CvData.kt',
    language: 'kotlin',
    description: 'Centralized CV Data Models for Personal Info, Education, Experience, and Skills.',
    code: `package com.baker.digitalcv.data

data class PersonalInfo(
    val fullNameBangla: String = "মোঃ বাকের হোসেন",
    val fullNameEnglish: String = "Md. Baker Hossain",
    val professionalTitle: String = "Business Development & NGO Professional",
    val phone: String = "01874-767561",
    val email: String = "mdbakerbdn@gmail.com",
    val location: String = "Bangladesh",
    val summary: String = "I am a hardworking and motivated professional with 2 years of experience as a Business Development Manager in the garments sector and 2 years of experience working in an NGO. I have experience in business development, customer communication, field operations, installment collection, record keeping and reporting. I have also received computer training and have basic professional computer skills."
)

data class EducationItem(
    val id: String,
    val degree: String,
    val gpa: String,
    val outOf: String = "5.00",
    val description: String
)

data class ExperienceItem(
    val id: String,
    val role: String,
    val sector: String,
    val duration: String,
    val responsibilities: List<String>
)

data class SkillItem(
    val id: String,
    val name: String,
    val category: String,
    val iconResName: String
)

data class CvData(
    val personalInfo: PersonalInfo,
    val education: List<EducationItem>,
    val experience: List<ExperienceItem>,
    val skills: List<SkillItem>
)

object CvRepository {
    fun getCvData(): CvData {
        return CvData(
            personalInfo = PersonalInfo(),
            education = listOf(
                EducationItem(
                    id = "hsc",
                    degree = "HSC",
                    gpa = "2.42",
                    description = "Higher Secondary Certificate examination."
                ),
                EducationItem(
                    id = "ssc",
                    degree = "SSC",
                    gpa = "3.92",
                    description = "Secondary School Certificate examination."
                )
            ),
            experience = listOf(
                ExperienceItem(
                    id = "exp_bdm",
                    role = "Business Development Manager",
                    sector = "Garments",
                    duration = "2 Years",
                    responsibilities = listOf(
                        "Business development",
                        "Customer/client communication",
                        "Customer relationship management",
                        "Market follow-up",
                        "Business growth support",
                        "Coordination and communication",
                        "Business-related activities"
                    )
                ),
                ExperienceItem(
                    id = "exp_ngo",
                    role = "NGO Professional",
                    sector = "NGO Sector",
                    duration = "2 Years",
                    responsibilities = listOf(
                        "Field operations",
                        "Customer/member communication",
                        "Installment collection",
                        "Installment follow-up",
                        "Record keeping",
                        "Daily reporting",
                        "Customer/member relationship management",
                        "Field-level coordination"
                    )
                )
            ),
            skills = listOf(
                SkillItem("1", "Computer Training", "Technical", "ic_computer"),
                SkillItem("2", "Computer Operation", "Technical", "ic_laptop"),
                SkillItem("3", "Microsoft Office", "Technical", "ic_office"),
                SkillItem("4", "Communication", "Soft", "ic_chat"),
                SkillItem("5", "Business Development", "Business", "ic_trending"),
                SkillItem("6", "Customer Relationship Management", "Business", "ic_people"),
                SkillItem("7", "Field Operations", "Operations", "ic_location"),
                SkillItem("8", "Record Keeping", "Operations", "ic_book"),
                SkillItem("9", "Reporting", "Operations", "ic_report"),
                SkillItem("10", "Teamwork", "Soft", "ic_group"),
                SkillItem("11", "Problem Solving", "Soft", "ic_lightbulb")
            )
        )
    }
}`
  },
  {
    filename: 'HomeScreen.kt',
    path: 'app/src/main/java/com/baker/digitalcv/ui/screens/HomeScreen.kt',
    language: 'kotlin',
    description: 'Material 3 Home Dashboard with Quick Profile, Experience Counter, and Action Buttons.',
    code: `package com.baker.digitalcv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.baker.digitalcv.data.CvData
import com.baker.digitalcv.util.ContactActions
import com.baker.digitalcv.util.PdfGenerator

@Composable
fun HomeScreen(
    cvData: CvData,
    onNavigateToCv: () -> Unit,
    onNavigateToContact: () -> Unit
) {
    val context = LocalContext.current
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Avatar Card
        Box(
            modifier = Modifier
                .size(110.dp)
                .clip(CircleShape)
                .background(MaterialTheme.colorScheme.primaryContainer),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Person,
                contentDescription = "Profile Photo",
                modifier = Modifier.size(64.dp),
                tint = MaterialTheme.colorScheme.primary
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = cvData.personalInfo.fullNameBangla,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )

        Text(
            text = cvData.personalInfo.fullNameEnglish,
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.SemiBold
        )

        Spacer(modifier = Modifier.height(6.dp))

        Surface(
            shape = RoundedCornerShape(20.dp),
            color = MaterialTheme.colorScheme.secondaryContainer
        ) {
            Text(
                text = cvData.personalInfo.professionalTitle,
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Metrics Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            MetricCard(
                title = "4+ Years",
                subtitle = "Total Experience",
                modifier = Modifier.weight(1f)
            )
            MetricCard(
                title = "2 Sectors",
                subtitle = "Garments & NGO",
                modifier = Modifier.weight(1f)
            )
            MetricCard(
                title = "11 Skills",
                subtitle = "Technical & Soft",
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Action Buttons
        Button(
            onClick = onNavigateToCv,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(14.dp)
        ) {
            Icon(Icons.Default.Description, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("View Full CV Document", fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(12.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            OutlinedButton(
                onClick = { PdfGenerator.generateA4CvPdf(context, cvData) },
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                shape = RoundedCornerShape(14.dp)
            ) {
                Icon(Icons.Default.Download, contentDescription = null)
                Spacer(modifier = Modifier.width(6.dp))
                Text("Save PDF")
            }

            Button(
                onClick = onNavigateToContact,
                modifier = Modifier
                    .weight(1f)
                    .height(48.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
            ) {
                Icon(Icons.Default.Phone, contentDescription = null)
                Spacer(modifier = Modifier.width(6.dp))
                Text("Contact")
            }
        }
    }
}

@Composable
fun MetricCard(
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodySmall,
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}`
  },
  {
    filename: 'ContactActions.kt',
    path: 'app/src/main/java/com/baker/digitalcv/util/ContactActions.kt',
    language: 'kotlin',
    description: 'Direct Android Intent handlers for Phone Dialer, WhatsApp, Email, and System Share.',
    code: `package com.baker.digitalcv.util

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast

object ContactActions {

    fun makePhoneCall(context: Context, phoneNumber: String = "01874-767561") {
        try {
            val cleanedNumber = phoneNumber.replace("-", "").replace(" ", "")
            val intent = Intent(Intent.ACTION_DIAL).apply {
                data = Uri.parse("tel:$cleanedNumber")
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(context, "Cannot open dialer: \${e.message}", Toast.LENGTH_SHORT).show()
        }
    }

    fun openWhatsApp(context: Context, phoneNumber: String = "01874-767561", message: String = "Hello মোঃ বাকের হোসেন, I viewed your Digital CV and would like to connect.") {
        try {
            var formatted = phoneNumber.replace("-", "").replace(" ", "")
            if (formatted.startsWith("0")) {
                formatted = "88" + formatted
            }
            val uri = Uri.parse("https://api.whatsapp.com/send?phone=$formatted&text=\${Uri.encode(message)}")
            val intent = Intent(Intent.ACTION_VIEW, uri)
            context.startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(context, "WhatsApp is not installed", Toast.LENGTH_SHORT).show()
        }
    }

    fun sendEmail(context: Context, email: String = "mdbakerbdn@gmail.com", subject: String = "Job Opportunity / Inquiry for মোঃ বাকের হোসেন") {
        try {
            val intent = Intent(Intent.ACTION_SENDTO).apply {
                data = Uri.parse("mailto:$email")
                putExtra(Intent.EXTRA_SUBJECT, subject)
            }
            context.startActivity(Intent.createChooser(intent, "Send Email"))
        } catch (e: Exception) {
            Toast.makeText(context, "No email client found", Toast.LENGTH_SHORT).show()
        }
    }

    fun shareCvDetails(context: Context, name: String, title: String, phone: String, email: String) {
        try {
            val text = """
                Digital CV of $name
                Title: $title
                Phone: $phone
                Email: $email
            """.trimIndent()
            
            val sendIntent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, text)
                type = "text/plain"
            }
            val shareIntent = Intent.createChooser(sendIntent, "Share CV")
            context.startActivity(shareIntent)
        } catch (e: Exception) {
            Toast.makeText(context, "Unable to share: \${e.message}", Toast.LENGTH_SHORT).show()
        }
    }
}`
  },
  {
    filename: 'PdfGenerator.kt',
    path: 'app/src/main/java/com/baker/digitalcv/util/PdfGenerator.kt',
    language: 'kotlin',
    description: 'Android native PdfDocument generator for A4 CV export and download.',
    code: `package com.baker.digitalcv.util

import android.content.Context
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import android.os.Environment
import android.widget.Toast
import com.baker.digitalcv.data.CvData
import java.io.File
import java.io.FileOutputStream

object PdfGenerator {

    fun generateA4CvPdf(context: Context, cvData: CvData): File? {
        val pdfDocument = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 at 72 DPI
        val page = pdfDocument.startPage(pageInfo)
        val canvas = page.canvas

        val headerPaint = Paint().apply {
            color = Color.rgb(30, 41, 59)
            style = Paint.Style.FILL
        }
        canvas.drawRect(0f, 0f, 595f, 110f, headerPaint)

        val titlePaint = Paint().apply {
            color = Color.WHITE
            textSize = 22f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        }
        canvas.drawText(cvData.personalInfo.fullNameEnglish.uppercase(), 30f, 45f, titlePaint)

        val banglaPaint = Paint().apply {
            color = Color.rgb(203, 213, 225)
            textSize = 14f
        }
        canvas.drawText(cvData.personalInfo.fullNameBangla, 30f, 68f, banglaPaint)

        val subtitlePaint = Paint().apply {
            color = Color.rgb(56, 189, 248)
            textSize = 12f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        }
        canvas.drawText(cvData.personalInfo.professionalTitle, 30f, 90f, subtitlePaint)

        val textPaint = Paint().apply {
            color = Color.rgb(51, 65, 85)
            textSize = 10f
        }

        var y = 140f
        fun drawSection(title: String) {
            val hPaint = Paint().apply {
                color = Color.rgb(15, 23, 42)
                textSize = 13f
                typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            }
            canvas.drawText(title.uppercase(), 30f, y, hPaint)
            val linePaint = Paint().apply {
                color = Color.rgb(203, 213, 225)
                strokeWidth = 1.5f
            }
            canvas.drawLine(30f, y + 4f, 565f, y + 4f, linePaint)
            y += 20f
        }

        // Summary
        drawSection("Professional Summary")
        canvas.drawText(cvData.personalInfo.summary.take(90) + "...", 30f, y, textPaint)
        y += 30f

        // Experience
        drawSection("Work Experience")
        for (exp in cvData.experience) {
            val boldPaint = Paint().apply {
                color = Color.rgb(15, 23, 42)
                textSize = 11f
                typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            }
            canvas.drawText("\${exp.role} (\${exp.sector}) - \${exp.duration}", 30f, y, boldPaint)
            y += 15f
            for (resp in exp.responsibilities.take(4)) {
                canvas.drawText("• $resp", 40f, y, textPaint)
                y += 13f
            }
            y += 8f
        }

        // Education
        drawSection("Education")
        for (edu in cvData.education) {
            canvas.drawText("\${edu.degree} - GPA: \${edu.gpa}/\${edu.outOf}", 30f, y, textPaint)
            y += 15f
        }

        pdfDocument.finishPage(page)

        return try {
            val downloadDir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS)
            val file = File(downloadDir, "Baker_Hossain_CV.pdf")
            pdfDocument.writeTo(FileOutputStream(file))
            pdfDocument.close()
            Toast.makeText(context, "PDF saved to: \${file.name}", Toast.LENGTH_LONG).show()
            file
        } catch (e: Exception) {
            pdfDocument.close()
            Toast.makeText(context, "Error creating PDF: \${e.message}", Toast.LENGTH_SHORT).show()
            null
        }
    }
}`
  },
  {
    filename: 'SplashScreen.kt',
    path: 'app/src/main/java/com/baker/digitalcv/ui/screens/SplashScreen.kt',
    language: 'kotlin',
    description: 'Animated Splash Screen with Bengali typography and fade transition.',
    code: `package com.baker.digitalcv.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(onAnimationFinish: () -> Unit) {
    var startAnimation by remember { mutableStateOf(false) }
    val scaleAnim = animateFloatAsState(
        targetValue = if (startAnimation) 1f else 0.6f,
        animationSpec = tween(durationMillis = 800, easing = FastOutSlowInEasing),
        label = "scale"
    )
    val alphaAnim = animateFloatAsState(
        targetValue = if (startAnimation) 1f else 0f,
        animationSpec = tween(durationMillis = 800),
        label = "alpha"
    )

    LaunchedEffect(key1 = true) {
        startAnimation = true
        delay(1800)
        onAnimationFinish()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color(0xFF0F172A), Color(0xFF1E293B))
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .scale(scaleAnim.value)
                .alpha(alphaAnim.value)
        ) {
            Text(
                text = "মোঃ বাকের হোসেন",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Digital CV • Android App",
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF38BDF8)
            )
        }
    }
}`
  },
  {
    filename: 'NavGraph.kt',
    path: 'app/src/main/java/com/baker/digitalcv/ui/navigation/AppNavGraph.kt',
    language: 'kotlin',
    description: 'Jetpack Compose Navigation Graph with routes and transitions.',
    code: `package com.baker.digitalcv.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.baker.digitalcv.data.CvData
import com.baker.digitalcv.ui.screens.HomeScreen

sealed class Screen(val route: String, val title: String) {
    object Home : Screen("home", "Home")
    object About : Screen("about", "About")
    object Experience : Screen("experience", "Experience")
    object Education : Screen("education", "Education")
    object Skills : Screen("skills", "Skills")
    object Contact : Screen("contact", "Contact")
    object CvPreview : Screen("cv_preview", "CV Document")
}

@Composable
fun AppNavGraph(
    navController: NavHostController,
    cvData: CvData,
    isDarkMode: Boolean,
    onToggleTheme: () -> Unit,
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route,
        modifier = modifier
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                cvData = cvData,
                onNavigateToCv = { navController.navigate(Screen.CvPreview.route) },
                onNavigateToContact = { navController.navigate(Screen.Contact.route) }
            )
        }
    }
}`
  },
  {
    filename: 'Theme.kt',
    path: 'app/src/main/java/com/baker/digitalcv/ui/theme/Theme.kt',
    language: 'kotlin',
    description: 'Material 3 Dynamic Color Scheme and Typography definitions.',
    code: `package com.baker.digitalcv.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF38BDF8),
    secondary = Color(0xFF10B981),
    background = Color(0xFF0F172A),
    surface = Color(0xFF1E293B),
    onPrimary = Color(0xFF0F172A),
    onBackground = Color(0xFFF8FAFC),
    onSurface = Color(0xFFF8FAFC)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF0284C7),
    secondary = Color(0xFF059669),
    background = Color(0xFFF8FAFC),
    surface = Color(0xFFFFFFFF),
    onPrimary = Color(0xFFFFFFFF),
    onBackground = Color(0xFF0F172A),
    onSurface = Color(0xFF0F172A)
)

@Composable
fun BakerDigitalCvTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}`
  },
  {
    filename: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'Android Manifest with Call, Internet, Storage, and Launcher configuration.',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.baker.digitalcv">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="28" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Baker Hossain – Digital CV"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.BakerDigitalCv">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="Baker Hossain – Digital CV"
            android:theme="@style/Theme.BakerDigitalCv">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  {
    filename: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    language: 'groovy',
    description: 'Gradle Build Configuration with Compose, Material 3, Navigation, and Coroutines.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.baker.digitalcv"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.baker.digitalcv"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.material.icons.extended)
    implementation(libs.androidx.activity.compose)
}`
  }
];
