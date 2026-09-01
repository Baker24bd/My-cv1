import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from './androidProjectCode';

export async function generateAndDownloadProjectZip(): Promise<boolean> {
  try {
    const zip = new JSZip();

    // 1. Add all project source files
    for (const file of ANDROID_PROJECT_FILES) {
      zip.file(file.path, file.code);
    }

    // 2. Add root Gradle wrapper and build settings files
    zip.file(
      'settings.gradle.kts',
      `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "BakerDigitalCv"
include(":app")
`
    );

    zip.file(
      'build.gradle.kts',
      `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
`
    );

    zip.file(
      'gradle/libs.versions.toml',
      `[versions]
agp = "8.5.2"
kotlin = "2.0.0"
coreKtx = "1.13.1"
lifecycleRuntimeKtx = "2.8.4"
activityCompose = "1.9.1"
composeBom = "2024.06.00"
navigationCompose = "2.7.7"
materialIconsExtended = "1.6.8"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended", version.ref = "materialIconsExtended" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
`
    );

    zip.file(
      'gradle/wrapper/gradle-wrapper.properties',
      `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.7-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
    );

    zip.file(
      'README.md',
      `# Baker Hossain – Digital CV (Native Android App)
Professional Resume Android Application for **মোঃ বাকের হোসেন** (Md. Baker Hossain).

## Features
- **Material 3 UI & Jetpack Compose**
- **Offline-First Data Storage**
- **Native Phone Dialer & WhatsApp Integration**
- **Native PDF CV Generation**
- **Dynamic Dark/Light Mode Theme**

## How to Build the APK
1. Open this project folder in **Android Studio (Hedgehog, Iguana, Jellyfish, or newer)**.
2. Allow Gradle to sync dependencies automatically.
3. Build the APK:
   - Go to menu: \`Build\` > \`Build Bundle(s) / APK(s)\` > \`Build APK(s)\`.
   - Or run command line in terminal:
     \`\`\`bash
     ./gradlew assembleDebug
     \`\`\`
4. The generated APK will be available in:
   \`app/build/outputs/apk/debug/app-debug.apk\`
5. Install directly on any Android device via \`adb install\` or copy to phone storage.
`
    );

    // Generate ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Baker_Hossain_DigitalCV_Android_Studio_Project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to generate project zip:', error);
    return false;
  }
}
