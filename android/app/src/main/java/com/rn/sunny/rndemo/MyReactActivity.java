package com.rn.sunny.rndemo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;
import com.mxn.soul.flowingdrawer_core.FlowingDrawer;
import com.mxn.soul.flowingdrawer_core.FlowingMenuLayout;

import java.util.concurrent.ArrayBlockingQueue;



public class MyReactActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {
    protected ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    private LinearLayout face;
    private LinearLayout home;
    private LinearLayout bloglist;
    private LinearLayout contact;
    private LinearLayout about;
    private Bundle myBundle;
    private FlowingMenuLayout menuLayout;
    private FlowingDrawer flowingDrawer;

    protected RelativeLayout myLayout;
    private static final int OVERLAY_PERMISSION_REQ_CODE = 233;
    private static final int IMAGE_PICKER_REQUEST = 12345;
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
    //构建一个阻塞的单一数据的队列
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
            }
        }
        setContentView(R.layout.my_react_main);
        //获取元素加事件
        myLayout=(RelativeLayout)findViewById(R.id.content);
        menuLayout=(FlowingMenuLayout)findViewById(R.id.menulayout);
        flowingDrawer=(FlowingDrawer)findViewById(R.id.drawerlayout);
        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new CustomReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        myBundle=new Bundle();
        dealMenuClick();
        myBundle.putString("select","home");
        mReactRootView.startReactApplication(mReactInstanceManager, "HelloWorld", myBundle);
        myLayout.addView(mReactRootView);
    }

    public void dealMenuClick(){
        home=(LinearLayout) findViewById(R.id.home);
        bloglist=(LinearLayout) findViewById(R.id.bloglist);
        contact=(LinearLayout) findViewById(R.id.contact);
        about=(LinearLayout) findViewById(R.id.about);
        face=(LinearLayout)findViewById(R.id.face);
        face.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("select","login");
                Log.i("select","login");
                sendEvent(mReactInstanceManager.getCurrentReactContext(), "selectView", params);
                flowingDrawer.closeMenu();
            }
        });
        home.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("select","home");
                Log.i("select","home");
                sendEvent(mReactInstanceManager.getCurrentReactContext(), "selectView", params);
                flowingDrawer.closeMenu();
            }
        });
        bloglist.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("select","bloglist");
                Log.i("select","bloglist");
                sendEvent(mReactInstanceManager.getCurrentReactContext(), "selectView", params);
                flowingDrawer.closeMenu();
            }
        });
        contact.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("select","contact");
                Log.i("select","contact");
                sendEvent(mReactInstanceManager.getCurrentReactContext(), "selectView", params);
                flowingDrawer.closeMenu();
            }
        });
        about.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WritableMap params = Arguments.createMap();
                params.putString("select","about");
                Log.i("select","about");
                sendEvent(mReactInstanceManager.getCurrentReactContext(), "selectView", params);
                flowingDrawer.closeMenu();
            }
        });
    }
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
    }
    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == IMAGE_PICKER_REQUEST) {
                if (resultCode == Activity.RESULT_CANCELED) {
                    mQueue.add(E_PICKER_CANCELLED+"Image picker was cancelled");
                } else if (resultCode == Activity.RESULT_OK) {
                    Uri uri = intent.getData();
                    if (uri == null) {
                        mQueue.add(E_NO_IMAGE_DATA_FOUND+"No image data found");
                    } else {
                        mQueue.add(uri.toString());
                    }
                }
        }
        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(this)) {
                    // SYSTEM_ALERT_WINDOW permission not granted...
                }
            }
        }
    }
}