
package com.roy.applocker.services

import android.app.*
import android.app.usage.UsageStatsManager
import android.content.*
import android.os.*
import android.view.WindowManager
import androidx.core.app.NotificationCompat
import java.util.*

/**
 * THIS IS THE NATIVE KOTLIN CODE REQUIRED FOR ANDROID.
 * This service runs in the foreground and checks which app is currently open.
 */
class AppLockService : Service() {

    private var lastApp: String? = null
    private val handler = Handler(Looper.getMainLooper())
    private lateinit var usageStatsManager: UsageStatsManager

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        createNotificationChannel()
        val notification = NotificationCompat.Builder(this, "LOCK_CHANNEL")
            .setContentTitle("ROY Security Active")
            .setContentText("Protecting your applications...")
            .setSmallIcon(android.R.drawable.ic_lock_idle_lock)
            .build()
        
        startForeground(1, notification)
        
        usageStatsManager = getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        
        // Start the monitoring loop
        handler.post(checkAppRunnable)
        
        return START_STICKY
    }

    private val checkAppRunnable = object : Runnable {
        override fun run() {
            checkForegroundApp()
            handler.postDelayed(this, 500) // Check every 500ms for battery efficiency
        }
    }

    private fun checkForegroundApp() {
        val time = System.currentTimeMillis()
        val stats = usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY, 
            time - 1000 * 10, 
            time
        )
        
        if (stats != null) {
            val sortedStats = stats.sortedByDescending { it.lastTimeUsed }
            if (sortedStats.isNotEmpty()) {
                val currentPackage = sortedStats[0].packageName
                
                // If the app is in our "Locked List" and isn't the locker itself
                if (isLockedApp(currentPackage) && currentPackage != lastApp) {
                    showLockOverlay(currentPackage)
                }
                lastApp = currentPackage
            }
        }
    }

    private fun isLockedApp(packageName: String): Boolean {
        // In a real app, you would check your Room Database/SharedPreferences here
        val lockedApps = listOf("com.instagram.android", "com.zhiliaoapp.musically") 
        return lockedApps.contains(packageName)
    }

    private fun showLockOverlay(packageName: String) {
        val intent = Intent(this, LockScreenActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        intent.putExtra("TARGET_APP", packageName)
        startActivity(intent)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "LOCK_CHANNEL", "App Locker Service",
                NotificationManager.IMPORTANCE_LOW
            )
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
