'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import * as gtag from '@/utils/gtag';

export function GoogleAnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        gtag.pageview(pathname);
    }, [pathname]);

    return null;
}
