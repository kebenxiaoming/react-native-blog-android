package com.rn.sunny.rndemo.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.util.AttributeSet;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;

import com.rn.sunny.rndemo.R;

/**
 * Created by sunny on 2017/1/6.
 */

public class ReactMaterialView extends View {
    /**
     * 文本
     */
    private String mTitleText;
    /**
     * 文本的颜色
     */
    private String mTitleTextColor="#ff0000";
    /**
     * 文本的大小
     */
    private int mTitleTextSize;

    /**
     * 绘制时控制文本绘制的范围
     */
    private Rect mBound;
    private Paint mPaint;

    public ReactMaterialView(Context context, AttributeSet attrs){
        this(context, attrs, 0);
        Log.i("construct","111");
    }

    public ReactMaterialView(Context context)
    {
        this(context, null);
        Log.i("construct","222");
    }

    /**
     * 获得我自定义的样式属性
     *
     * @param context
     * @param attrs
     * @param defStyle
     */
    public ReactMaterialView(Context context, AttributeSet attrs, int defStyle)
    {
        super(context, attrs, defStyle);
        /**
         * 获得我们所定义的自定义样式属性
         */
        TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.ReactMaterialView, defStyle, 0);
        int n = a.getIndexCount();
        for (int i = 0; i < n; i++)
        {
            int attr = a.getIndex(i);
            switch (attr)
            {
                case R.styleable.ReactMaterialView_titleText:
                    mTitleText = a.getString(attr);
                    break;
                case R.styleable.ReactMaterialView_titleTextColor:
                    // 默认颜色设置为黑色
                    mTitleTextColor = Integer.toHexString(a.getColor(attr, Color.BLACK));
                    break;
                case R.styleable.ReactMaterialView_titleTextSize:
                    // 默认设置为16sp，TypeValue也可以把sp转化为px
                    mTitleTextSize = a.getDimensionPixelSize(attr, (int) TypedValue.applyDimension(
                            TypedValue.COMPLEX_UNIT_SP, 16, getResources().getDisplayMetrics()));
                    break;
            }

        }
        a.recycle();
        Log.i("construct","333");
        /**
         * 获得绘制文本的宽和高
         */
        mPaint = new Paint();
        mBound = new Rect();
    }
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec)
    {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    @Override
    protected void onDraw(Canvas canvas)
    {
        mPaint.setTextSize(mTitleTextSize);
        mPaint.setColor(Color.YELLOW);
        canvas.drawRect(0, 0, getMeasuredWidth(), getMeasuredHeight(), mPaint);

        mPaint.getTextBounds(mTitleText, 0, mTitleText.length(), mBound);
        mPaint.setColor(Color.parseColor(mTitleTextColor));
        float x=getWidth() / 2 - mBound.width() / 2;
        float y= getHeight() / 2 + mBound.height() / 2;
        Log.i("construct",this.mTitleText+mTitleTextColor+this.mTitleTextSize+";X:"+x+",Y:"+y);
        canvas.drawText(mTitleText, x, y, mPaint);
    }

    protected void setmTitleText(String mTitleText){this.mTitleText=mTitleText;}

    protected void setmTitleTextColor(String mTitleTextColor){
        this.mTitleTextColor=mTitleTextColor;
    }

    protected void setmTitleTextSize(int mTitleTextSize){
        this.mTitleTextSize=mTitleTextSize;
    }

}
