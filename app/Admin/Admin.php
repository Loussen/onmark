<?php

namespace App\Admin;

use App\Admin\Models\AdminMenu;
use App\Models\ShopVendor;
use Illuminate\Support\Facades\Auth;

/**
 * Class Admin.
 */
class Admin
{

    public static function user()
    {
        return Auth::guard('admin')->user();
    }

    public static function isLoginPage()
    {
        return (request()->route()->getName() == 'admin.login');
    }

    public static function isLogoutPage()
    {
        return (request()->route()->getName() == 'admin.logout');
    }
    public static function getMenu()
    {
        return AdminMenu::getList()->groupBy('parent_id');
    }
    public static function getMenuVisible()
    {
        return AdminMenu::getListVisible();
    }

    public static function getAdminVendorId()
    {
        $vendorId['id'] = 0;
        foreach (self::user()->roles as $value)
        {
            if($value['slug'] == 'vendor')
            {
                $vendorId = ShopVendor::select('id')->where('admin_id', self::user()->id)->first();
                break;
            }
        }

        return $vendorId['id'];
    }
}
