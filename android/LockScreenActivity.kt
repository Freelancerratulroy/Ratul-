
package com.roy.applocker.ui

import android.os.Bundle
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import com.roy.applocker.R
import com.roy.applocker.databinding.ActivityLockScreenBinding

/**
 * The actual lock screen that appears over target apps.
 */
class LockScreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLockScreenBinding
    private var targetPackage: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // SECURITY: Prevent screenshots and screen recording
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        )

        binding = ActivityLockScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)

        targetPackage = intent.getStringExtra("TARGET_APP")
        
        setupUnlockUI()
    }

    private fun setupUnlockUI() {
        // Here we would implement the logic for:
        // 1. Invisible Pattern
        // 2. Emotion Recognition (via ML Kit)
        // 3. AR Anchor detection
        
        binding.btnUnlock.setOnClickListener {
            validateAndUnlock()
        }
    }

    private fun validateAndUnlock() {
        // On success:
        finish() 
        // On failure:
        triggerIntruderProtocol()
    }

    private fun triggerIntruderProtocol() {
        // 1. Capture photo via Front Camera (CameraX)
        // 2. Log timestamp and location
        // 3. Show "Fake OS" simulation to confuse the intruder
        showFakeOS()
    }

    private fun showFakeOS() {
        // Transition to a fake launcher or gallery
    }

    override fun onBackPressed() {
        // Block back button so user can't bypass the lock
        // Send user to Home screen
        val startMain = android.content.Intent(android.content.Intent.ACTION_MAIN)
        startMain.addCategory(android.content.Intent.CATEGORY_HOME)
        startMain.flags = android.content.Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(startMain)
    }
}
